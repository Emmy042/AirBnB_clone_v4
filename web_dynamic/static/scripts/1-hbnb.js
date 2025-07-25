$(document).ready(function () {
  const selectedAmenities = {};

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the <h4> inside div.amenities with selected names
    const amenityList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(amenityList);
  });
});
