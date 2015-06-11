require 'fileutils'

class ImagesController  < ApplicationController	

  helper_method :image_path, :image_url

  @@USER_IMAGES_FOLDER_ROOT = 'public/uploads'
  @@USER_IMAGE_URL          = 'public/uploads'
  
  @@images_path = {
    :big              => 'big',
    :medium           => 'scaled',
    :small            => 'thub',
  }


  @@big_size     = 1400
  @@medium_size  = 600
  @@small_size   = 200


  def index
    # images = [
    #     {"id":1, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":2, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":3, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    #     {"id":4, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":5, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "txt":'' },
    #     {"id":6, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "txt":'' },
    #     {"id":7, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "txt":'' },
    #     {"id":8, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":9, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    #     {"id":10, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":11, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":12, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    #     {"id":13, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":14, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":15, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    #     {"id":16, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":17, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1729.jpg', "txt":'' },
    #     {"id":18, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1549.jpg', "txt":'' },
    #     {"id":19, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1724.jpg', "txt":'' },
    #     {"id":20, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },
    #     {"id":21, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1772.jpg', "txt":'' },
    #     {"id":22, "thumb": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "image": 'http://127.0.0.1:8000/static/img/media/IMG_1760.jpg', "txt":'' },

    #     {"id":23, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1975.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1975.jpg', "txt":'' },
    #     {"id":24, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1980.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1980.jpg', "txt":'' },
    #     {"id":25, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1992.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1992.jpg', "txt":'' },
    #     {"id":26, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1999.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_1999.jpg', "txt":'' },
    #     {"id":27, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2001.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2001.jpg', "txt":'' },
    #     {"id":28, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2005.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2005.jpg', "txt":'' },
    #     {"id":29, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2098.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2098.jpg', "txt":'' },
    #     {"id":30, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2100.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2100.jpg', "txt":'' },
    #     {"id":31, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2104.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2104.jpg', "txt":'' },
    #     {"id":32, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2107.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2107.jpg', "txt":'' },
    #     {"id":33, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2125.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2125.jpg', "txt":'' },
    #     {"id":34, "thumb": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2131.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2131.jpg', "txt":'' },
    #     {"id":35, "thumb": 'http://127.0.0.1:8000/static/img/media/alonlogo.jpg', "image": 'http://127.0.0.1:8000/static/img/media/newborn/IMG_2131.jpg', "txt":'' },

    #     {"id":36, "thumb": 'http://127.0.0.1:8000/static/img/media/trips/2169dbff8fde9ebe.jpeg', "image": 'http://127.0.0.1:8000/static/img/media/trips/2169dbff8fde9ebe.jpeg', "txt":'' },
    #     {"id":37, "thumb": 'http://127.0.0.1:8000/static/img/media/trips/4c84b84f6e232389.jpeg', "image": 'http://127.0.0.1:8000/static/img/media/trips/4c84b84f6e232389.jpeg', "txt":'' },
    #     {"id":38, "thumb": 'http://127.0.0.1:8000/static/img/media/trips/b3db88a8946e7cd5.jpeg', "image": 'http://127.0.0.1:8000/static/img/media/trips/b3db88a8946e7cd5.jpeg', "txt":'' },
    #     {"id":39, "thumb": 'http://127.0.0.1:8000/static/img/media/trips/bf329957f5d9a86c.jpeg', "image": 'http://127.0.0.1:8000/static/img/media/trips/bf329957f5d9a86c.jpeg', "txt":'' },
    #     {"id":40, "thumb": 'http://127.0.0.1:8000/static/img/media/trips/c9361809be1e5135.jpeg', "image": 'http://127.0.0.1:8000/static/img/media/trips/c9361809be1e5135.jpeg', "txt":'' },

    #     {"id":41, "thumb": 'http://127.0.0.1:8000/static/img/media/logos/inspiration.jpg', "image": 'http://127.0.0.1:8000/static/img/media/logos/inspiration.jpg', "txt":'' },
    #     {"id":42, "thumb": 'http://127.0.0.1:8000/static/img/media/logos/logo1.png', "image": 'http://127.0.0.1:8000/static/img/media/logos/logo1.png', "txt":'' },

    #   ]
      
      images = Site.find(params[:site_id]).images
      render :json => images
  end

  def show
  	puts '*******'
  	puts ' show '
  	puts '*******'
  end

  def new
    @image = Image.new
  end

  def image_path(size, relative_path)
    File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, @@images_path[size], relative_path)
  end

  def image_url(relative_path)

  end

  def create
    if remotipart_submitted?
      
    end
    
    # params[:file].original_filename
    image = MiniMagick::Image.open(params[:file].tempfile.path)

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
      image.format params[:file].content_type.split('/')[1]
      path = image_path(key, params[:file].original_filename.gsub(' ', ''))
    
      path = File.join(File.dirname(path), Time.now.to_i.to_s + File.basename(path)) if File.file? path

      val[2] = path

      dirname = File.dirname(path)
      unless File.directory?(dirname)
        FileUtils.mkdir_p(dirname)
      end
      image.write path
    end

    Image.create( 
      :path_big       => sizes[:big][2].gsub(File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, '/'), ''),
      :path_medium    => sizes[:medium][2].gsub(File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, '/'), ''),
      :path_small     => sizes[:small][2].gsub(File.join(Rails.root, @@USER_IMAGES_FOLDER_ROOT, '/'), ''),
      :width_big      => sizes[:big][0],
      :width_medium   => sizes[:medium][0],
      :width_small    => sizes[:small][0],
      :height_big     => sizes[:big][1],
      :height_medium  => sizes[:medium][1],
      :height_small   => sizes[:small][1],
      :site_id        => 1,
    )

    render :nothing => true, :status => 200
  end

  def destroy
  	puts '*******  '
  	puts ' destroy '
  	puts '*******  '
  end

end