// DONE: Url always points to version 2 (without context checking)
// DONE: getImageId method - cuts host and returns full path (id/version/image)

(function($) {

  $.Iiif = {

    getImageUrl: function(image) {

      if (!image.images[0].resource.service) {
        id = image.images[0].resource['default'].service['@id'];
        id = id.replace(/\/$/, "");
        return id;
      }
      
      var id = image.images[0].resource.service['@id'];
      id = id.replace(/\/$/, "");

      return id;
    },

    getImageId: function(canvas) {
      var id = canvas.images[0].resource.service['@id'];
      id = id.replace(/.*\/IIIF\//g,"");

      return id;
    },

    getImageIdByString: function(canvasId) {
          var id = canvasId.replace(/.*\/IIIF\//g,"");
          return id;
    },


    getVersionFromContext: function(context) {
      if (context == "http://iiif.io/api/image/2/context.json") {
        return "2.0";
      } else {
        return "1.1";
      }
    },

    makeUriWithWidth: function(uri, width, version) {
      uri = uri.replace(/\/$/, '');
      return uri + '/full/' + width + ',/0/default.jpg';

      /*if (version[0] == '1') {
        return uri + '/full/' + width + ',/0/native.jpg';
      } else {
        return uri + '/full/' + width + ',/0/default.jpg';
      }*/
    },

    getImageHostUrl: function(json) {
      var regex,
          matches = [];

      if (!json.hasOwnProperty('image_host')) {

        json.image_host = json.tilesUrl || json['@id'] || '';

       if (json.hasOwnProperty('identifier')) {
          regex = new RegExp('/?' + json.identifier + '/?$', 'i');
          json.image_host = json.image_host.replace(regex, '');

        } else {
          regex = new RegExp('(.*)\/(.*)$');
          matches = regex.exec(json.image_host);

          if (matches.length > 1) {
            json.image_host = matches[1];
            json.identifier = matches[2];
          }
        }
      }

      return json.image_host;
    }

  };

}(Mirador));

