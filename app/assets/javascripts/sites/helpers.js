
function ifCond(v1,operator,v2,options) {
  switch (operator)
  {
    case "==":
      return (v1==v2)?options.fn(this):options.inverse(this);

    case "!=":
      return (v1!=v2)?options.fn(this):options.inverse(this);

    case "===":
      return (v1===v2)?options.fn(this):options.inverse(this);

    case "!==":
      return (v1!==v2)?options.fn(this):options.inverse(this);

    case "&&":
      return (v1&&v2)?options.fn(this):options.inverse(this);

    case "||":
      return (v1||v2)?options.fn(this):options.inverse(this);

    case "<":
      return (v1<v2)?options.fn(this):options.inverse(this);

    case "<=":
      return (v1<=v2)?options.fn(this):options.inverse(this);

    case ">":
      return (v1>v2)?options.fn(this):options.inverse(this);

    case ">=":
      return (v1>=v2)?options.fn(this):options.inverse(this);

    default:
      return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
  }
}

function url_from_image_element(el, size) {
  var lurl;
  el["image-id"] ? lurl=url_from_image_id(el["image-id"], size) : lurl="";
  return lurl
}

function url_from_image_id(img_id, size) {
  var lurl;
  if (img_id) {
    var img = site_images[ img_id ];
    if (img) {
      lurl=img[size] ;
    }
    else {
      lurl="";  
    }
  }
  else {
    lurl="";
  }
  return lurl
  // return "http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg";
}
