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


  @@big_size     = 1440
  @@medium_size  = 600
  @@small_size   = 340


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

      images = Site.find(params[:site_id]).images.order('created_at DESC')
      render :json => images
  end

  def show
  	puts '*******'
  	puts ' show '
  	puts '*******'
  end

  def new
    @image = Image.new( :site_id => params[:site] )
    render layout: false
  end

  def image_path(size, relative_path)
    Image.image_path(size, relative_path)
  end

  def image_url(relative_path)

  end

  def create
    if remotipart_submitted?

    end

    site_id = ( params[:image].nil_or[:site_id] || params[:site_id] )
    image = Image.create( params[:file], site_id )
    l_site = Site.find(site_id)
    l_site.images << image

    if ( params[:single_link] )
      render :json => { :id => (image.id).to_s, :link => Image.image_url(image.path_big) }, :status => 200
    else
      render :nothing => true, :status => 200
    end
  end

  def destroy
    site = Site.find( params[:site_id] )
    image = Image.find( params[:id] )

    # Remove from the joinded table
    site.images.destroy(image)
    # Destroy the image record if no other site use it
    image.destroy if ImagesSite.where{ image_id == my{params[:id]} }.empty?

    render :nothing => true, :status => 200
  end

end