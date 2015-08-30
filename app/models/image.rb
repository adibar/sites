# == Schema Information
#
# Table name: images
#
#  id            :integer          not null, primary key
#  title         :string
#  text          :string
#  path_big      :string
#  path_medium   :string
#  path_small    :string
#  width_big     :integer
#  width_medium  :integer
#  width_small   :integer
#  height_big    :integer
#  height_medium :integer
#  height_small  :integer
#  site_id       :integer
#  created_at    :datetime
#  updated_at    :datetime
#  name          :string
#
# Indexes
#
#  index_images_on_site_id  (site_id)
#

require 'fileutils'

class Image < ActiveRecord::Base

  # belongs_to :site
  has_and_belongs_to_many :sites, -> { uniq }
  # has_and_belongs_to_many :sites

  before_destroy { sites.clear }
  before_destroy :delete_files

  @@USER_IMAGES_FOLDER_ROOT = 'public/uploads'
  @@USER_IMAGE_URL          = 'public/uploads'

  @@images_path = {
    :big              => 'big',
    :medium           => 'scaled',
    :small            => 'thub',
  }

  @@big_size     = 1440
  @@medium_size  = 600
  @@small_size   = 340

  def delete_files
    @@images_path.keys.each do |k|
      path = get_path(k)[:absolute]
      FileUtils.remove_file(path, force = true)
    end
  end

  # def self.image_path(size, relative_path)
  #   File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, @@images_path[size], relative_path)
  # end

  # def self.image_path_to_save(size, relative_path)
  #   path = image_path(size, relative_path)
  #   path = File.join(File.dirname(path), Time.now.to_i.to_s + File.basename(path)) if File.file? path
  #   path
  # end

  # return both absolute and relative path
  def self.set_path(size, file_name)
    relative   = file_name ?
                  File.join( @@images_path[size], ( Time.now.to_f.to_s.gsub('.', '') + file_name.gsub(' ', '') ) ) :
                    File.join( @@images_path[size], (Time.now.to_f.to_s.gsub('.', '')) )
    absolute  = File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, relative)

    { :relative => relative, :absolute => absolute }
  end

  def get_path(size)
    relative = self.send("path_" + size.to_s)
    {
      :relative => relative,
      :absolute => File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, relative)
    }
  end

  def dup
    dupped = super
    sizes = [ :big, :medium, :small ]

    sizes.each do |s|
      to = self.class.set_path(s, dupped.name)
      from = dupped.get_path(s)
      puts '*'*50
      puts "from #{from} to #{to}"
      FileUtils.cp from[:absolute], to[:absolute]
      dupped.send("path_" + s.to_s + "=", to[:relative])
    end

    dupped
  end

  def self.image_url(path)
  	File.join( '/uploads', path)
  end

  def as_json options={}
  	# byebug
    {
  		:id     => id,
  		:thumb  => path_small.nil? ? nil : self.class.image_url(path_small),
      # :thumb  => "/uploads/big/1440682444167409_MG_1382.jpg",
  		:image  => path_big.nil? ? nil : self.class.image_url(path_big),
      # :image  => "/uploads/big/1440682444167409_MG_1382.jpg",
  		:txt    => text ? text : '',
  		:title  => title ? title : '',
  	}
  end

  def self.create(file, site_id)

    image = MiniMagick::Image.open(file.tempfile.path)

    if image.width > image.height
      b = [ @@big_size,    (@@big_size/(image.width.to_f / image.height)) ]
      m = [ @@medium_size, (@@medium_size/(image.width.to_f / image.height)) ]
      s = [ @@small_size,  (@@small_size/(image.width.to_f / image.height)) ]
    else
      b = [ (@@big_size*(image.width.to_f / image.height)),     @@big_size,     '' ]
      m = [ (@@medium_size*(image.width.to_f / image.height)),  @@medium_size,  '' ]
      s = [ (@@small_size*(image.width.to_f / image.height)),   @@small_size,   '' ]
    end

    sizes = { :big => b, :medium => m, :small =>s }

    sizes.each_pair do |key, val|
      image.resize "#{val[0]}x#{val[1]}"
      image.format file.content_type.split('/')[1]

      path = set_path(key, file.original_filename)

      val[2] = path

      dirname = File.dirname(path[:absolute])
      unless File.directory?(dirname)
        FileUtils.mkdir_p(dirname)
      end
      image.write path[:absolute]
    end

    image = super(
      :path_big       => sizes[:big][2][:relative],
      :path_medium    => sizes[:medium][2][:relative],
      :path_small     => sizes[:small][2][:relative],
      :width_big      => sizes[:big][0],
      :width_medium   => sizes[:medium][0],
      :width_small    => sizes[:small][0],
      :height_big     => sizes[:big][1],
      :height_medium  => sizes[:medium][1],
      :height_small   => sizes[:small][1],
      :site_id        => site_id,
      :name           => file.original_filename
    )

    image

  end

  # timestemp in micro sec => 54 bit => currenly only 51 bit in use with current DateTime
  # 12 bit => 10 lsb from time stamp + random between 0-3
  # 8 bit shard (future use) => up to 256 shards
  # 44 msb bit from time stamp timestamp
  def self.generate_id(shard=0)
    current_time = DateTime.current

    timestamp_in_micro_sec = current_time.strftime("%s%6N").to_i # 51 bit for time in micro sec till 2039 => then 52 bits => upto 54 bit usage

    #we use upto 54 bits for future usage => currently only 51 bit accupied

    sec_and_millisec_part = (timestamp_in_micro_sec & 0x3ff) # lsb 10 bits
    microsec_part         = ( (timestamp_in_micro_sec & 0x3ffffffffffc00) >> 10 ) #msb 42 bits

    l_id =
      (microsec_part << 20) +
      (shard << 12) +
      (sec_and_millisec_part << 2) + rand(0..3)  

    l_id
  end

end
