
def image_folder(site_name)
	Rails.root.join("public/templates_media/", site_name).to_s
end

def image_path(site_name, image_name)
	File.join( image_folder(site_name), image_name ).to_s
end


##############################################
# =>    Creating yml from template sites	   #
##############################################

def seed_create_sites_yml
	yml_file_path = File.join(Rails.root, 'app/db/seed/sites.yml')

	data 			= Site.seeds_data
	yml_data	= cnf = YAML::load_file( yml_file_path )

	data[:sites].each do|key, val|

		yml_data[:sites] = yml_data[:sites] ? yml_data[:sites] : {} #init with empty hash if no data

		if yml_data[:sites].nil_or.keys.nil_or.include? key # Site template allready exists
			puts "Template exists #{key}"
			# TODO

		else # New Site Template
			puts "New template #{key}"
			# handle the site
			yml_data[:sites][key] = val

			# handle the images
			seed_create_images_in_assets( key, yml_data[:sites][key][:images] )

		end
	end

	# update the yml file
	File.open(yml_file_path, 'w') {|f| f.write yml_data.to_yaml }

end

def seed_create_images_in_assets(site_name, images)
	images_path = image_folder(site_name)

	FileUtils::mkdir_p images_path unless File.exists? (images_path) #create the folder if does not exist

	images.each do |i|

		image = Image.find( i[:id] )
		path = image.get_path(:big)[:absolute]

		FileUtils.cp(path, image_path( site_name, i[:name] ) )
	end
end

################################################
# =>  END => Creating yml from template sites	 #
################################################

#
# ...
# ....
# .....
# ......
# .......

##############################################
# =>      Creating templates from yml	   		 #
##############################################

def seed_templates
	puts 'Seed template sites...'

	yml_file_path = File.join(Rails.root, 'app/db/seed/sites.yml')
	yml_data	= cnf = YAML::load_file( yml_file_path )

	yml_data[:sites].each do |key, value|
		puts "#{key} - #{value[:site][:title]}"

		site = Site.find_by_name(key) ? Site.find_by_name(key) : Site.new # Existing file or new

		# Create / edit the Site
		site.name 			= key
		site.title 			= value[:site][:title]
		site.data 			= value[:site][:data]
		site.site_type 	= value[:site][:type]
		site.save

		# Create its images
		value[:images].each do |i|
			img_id 		= i[:id]
			img_name 	= i[:name]

			img = Image.find(img_id)

			unless img # Create if do not exist
				img_path = image_path(key, img_name)
				f = File.new(image_path)
				img = Image.create(f, site.id)
			end

			site.images << img if site.images.where{ id == img.id }.empty? # Add to site if do not hold it allready

		end

	end

end

##############################################
# => END =>	Creating templates from yml	   	 #
##############################################

