// static/scripts/4-hbnb.js
$(document).ready(function () {
  const amenityDict = {};

  // Handle amenity checkbox changes
  $('.amenities input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenityDict[$(this).data('id')];
    }
    $('.amenities h4').text(Object.values(amenityDict).join(', '));
  });

  // Check API status
$.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
        $('#api_status').addClass('available');
    } else {
        $('#api_status').removeClass('available');
    }
});

  // When button is clicked, POST to places_search with selected amenities
  $('button').click(function () {
    const amenityIds = Object.keys(amenityDict);

    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenityIds }),
      success: function (places) {
        $('section.places').empty();

        places.forEach(place => {
          const article = $('<article></article>');
          article.html(`
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          `);
          $('section.places').append(article);
        });
      }
    });
  });
});
