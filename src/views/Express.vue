<template lang='pug'>
  form.container.py-4(@submit.prevent='submit')
    h1.mt-5 Envios Express
    p.lead
      | Seleccione el origen y destino de su envio.
    hr
    //-form.row.form-group(@submit.prevent='addShipment')
      .col
        .input-group
          input.form-control(type='text' placeholder='Origen')
          input.form-control(type='text' placeholder='Destino')
          .input-group-append
            button.btn.btn-primary(type='submit')
              feather(type='plus')
              |  Agregar 
    .row
      form.col-md-4(@submit.prevent='addShipment' novalidate)
        .form-group
          label.col-form-label Origen
          .input-group
            input#fromPlaces.form-control(type='text' placeholder='Origen' required)
            .input-group-append
              button.btn.btn-secondary(type='button' @click='origin = null' v-if='origin')
                feather(type='trash-2')
            <div class="invalid-feedback">
              | No es una direccíon valida
            </div>
          <input id="origin" name="origin" required type="hidden" />
        .form-group
          label.col-form-label Destino
          .input-group
            input#toPlaces.form-control(type='text' placeholder='Destino' required)
            .input-group-append
              button.btn.btn-secondary(type='button' @click='destination = null' v-if='destination')
                feather(type='trash-2')
            <div class="invalid-feedback">
              | No es una direccíon valida
            </div>
          <input id="destination" name="destination" required type="hidden" />
        .d-flex.justify-content-end
          button.btn.btn-primary(type='submit')
            feather(type='plus')
            |  Agregar
      .col
        .card
          .card-header.border-bottom-0
            .lead Lista de envios
          ul.list-group.list-group-flush
            li.list-group-item.text-center(v-for='(item, index) in shipments')
              | Distancia: {{ item.distance }} Km / Tarifa: S/ {{ (item.distance * 1).toFixed(2) }}
            li.list-group-item.lead.text-center.text-muted(v-if='!shipments.lenght')
              | Ningun envio registrado
</template>

<script>
import ModuleCard from '@/components/ModuleCard'
import TestModal from '@/components/TestModal'
import { db, auth } from '@/db'
// import { google } from '@/google'

export default {
  components: {
    ModuleCard,
    TestModal,
  },
  mounted() {
    // this.localUser = Object.assign({}, this.user);
    this.fromPlaces = new google.maps.places.Autocomplete(this.$el.querySelector('#fromPlaces'));
    this.toPlaces = new google.maps.places.Autocomplete(this.$el.querySelector('#toPlaces'));
    console.log(this.fromPlaces);
    google.maps.event.addListener(this.fromPlaces, 'place_changed', () => {
      var from_place = this.fromPlaces.getPlace();
      var address = from_place.formatted_address;
      // $('#origin').val(from_address);
      $('#fromPlaces').removeClass('is-invalid');
      this.origin = address;
    });

    google.maps.event.addListener(this.toPlaces, 'place_changed', () => {
      var to_place = this.toPlaces.getPlace();
      var address = to_place.formatted_address;
      // $('#destination').val(to_address);
      $('#toPlaces').removeClass('is-invalid');
      this.destination = address;
    });
  },
  data() {
    return {
      shipments: [],
      fromPlaces: null,
      toPlaces: null,
      origin: null,
      destination: null,
    }
  },
  methods: {
    addShipment() {
      if (!this.origin) {
        $('#fromPlaces').addClass('is-invalid');
      }
      if (!this.destination) {
        $('#toPlaces').addClass('is-invalid');
      }
      if (!(this.origin || this.destination)) {
        return true;
      }
      console.log(this.origin);
      console.log(this.destination);
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [this.origin],
        destinations: [this.destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
        // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status != google.maps.DistanceMatrixStatus.OK) {
            $('#result').html(err);
          } else {
            var origin = response.originAddresses[0];
            var destination = response.destinationAddresses[0];
            if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
              $('#result').html("Better get on a plane. There are no roads between "  + origin + " and " + destination);
            } else {
              var shipment = {};
              var distance = response.rows[0].elements[0].distance;
              var duration = response.rows[0].elements[0].duration;
              console.log(response.rows[0].elements[0].distance);
              var distance_in_kilo = distance.value / 1000; // the kilom
              var distance_in_mile = distance.value / 1609.34; // the mile
              var duration_text = duration.text;
              var duration_value = duration.value;
              // $('#in_mile').text(distance_in_mile.toFixed(2));
              // $('#in_kilo').text(distance_in_kilo.toFixed(2));
              // $('#duration_text').text(duration_text);
              // $('#duration_value').text(duration_value);
              // $('#from').text(origin);
              // $('#to').text(destination);
              shipment.from = this.origin;
              shipment.to = this.destination;
              shipment.distance = distance_in_kilo;
              shipment.durationText = duration_text;
              shipment.durationValue = duration_value;
              this.shipments.push(shipment);
              this.origin = null;
              this.destination = null;
            }
          }
      });
    },
    submit() {
      db.collection("settings").doc(this.user.uid).update(this.setting);
      var user = auth.currentUser;
      user.updateProfile({
        displayName: this.localUser.displayName,
      });
      this.$message('Se han guardado los cambios');
    }
  }
}
</script>
