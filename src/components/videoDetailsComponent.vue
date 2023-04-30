<template>
  <!-- <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-img
      width="500"
      class="align-end text-white"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="350"
      :src="data.thumbnails.standard.url"
      cover
    >
    <v-container  fluid  class="mb-10">
        <v-row justify="center" align-center>
            <v-col cols="4"  justify="center" class="d-flex">
              <v-spacer></v-spacer>
              <v-btn icon="mdi-play-circle-outline" size="x-large" @click="$emit('watchVideo')"></v-btn>
              <v-spacer></v-spacer>
            </v-col>
        </v-row>
        
    </v-container>
  
    <v-card-title>{{ data.title }}</v-card-title>
    </v-img>
    <v-card width="100%"  class="overflow-auto">
      <v-card-text>
        <h3>Descrription</h3>
        {{ data.description }}
      </v-card-text>
    </v-card>
    <v-card-actions>
      <v-row dense v-if="type=='add'">
        <v-col cols="6" >
          <v-btn block rounded="0" size="x-large" variant="outlined" @click="$emit('closeDialog')">Cancelar</v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn block rounded="0" size="x-large" variant="elevated" color="primary" @click="$emit('saveVideo')">Guardar</v-btn>
        </v-col>
      </v-row>
      <v-row dense v-if="type=='details'" justify="center">
        <v-col cols="6">
          <v-btn block rounded="0" size="x-large" variant="outlined" @click="$emit('closeDialog')">Cancelar</v-btn>
        </v-col>
        <v-col cols="6" >
          <v-btn block rounded="0" size="x-large" variant="elevated" color="red" @click="$emit('deleteVideo')">Borrar</v-btn>
        </v-col>
      </v-row>
      
    </v-card-actions>
  </v-card> -->
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-container fluid  class="pa-0 pb-3">
      <v-row no-gutters>
        <v-col cols="12">
          <LiteYouTubeEmbed
          :id="data.id"
          title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
        />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" elevation="10">
          <v-card width="100%"  class="overflow-auto" style="max-height:200px">
            <v-card-title>Description</v-card-title>
            <v-card-text>
              {{ data.description }}
            </v-card-text>
            </v-card>
        </v-col>
      </v-row>
      <v-row v-if="type=='add'">
        <v-col cols="12">
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#EF5350" @click="$emit('closeDialog')" style="font-weight:400">
              Cancelar
            </v-btn>
            <v-btn color="#00796B" variant="elevated" style="font-weight:400; color:white"  @click="$emit('saveVideo')">
              Agregar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row v-if="type=='details' && !deleteConfirm">
        <v-col cols="12">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#304FFE" @click="$emit('closeDialog')" style="font-weight:400">
              Cerrar
            </v-btn>
            <v-btn color="#D32F2F" variant="elevated" style="font-weight:700!important; color:white"  @click="deleteConfirm = true">
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row v-if="type=='details' && deleteConfirm">
        <v-col cols="12">
          <v-card-actions style="background-color:#D32F2F" class="animate__animated animate__flash">
            <span class="animate__animated animate__pulse animate__infinite infinite">
              <v-icon color="white" style="font-size:30px">mdi-alert-circle</v-icon>
              <span style="color:white">
                Seguro de eliminar?
              </span>
            </span>
            
            <v-spacer></v-spacer>
            <v-btn color="#304FFE" @click="$emit('closeDialog')" style="font-weight:400; color:white">
              No
            </v-btn>
            <v-btn color="#FAFAFA" variant="elevated" style="font-weight:700!important; color:#D50000"  @click="$emit('deleteVideo')">
              Si, Eliminar
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup>
  import { ref, computed} from 'vue'
  import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
  import 'vue-lite-youtube-embed/style.css'
  import 'animate.css';
  

  const props = defineProps({
  title: String,
  data: Object,
  type: String
})
  const actionLoading  = ref( false )
  const selection = ref( 1 )
  const deleteConfirm = ref( false )
  const descriptionInList = computed(()=>{
      if(props.data.data.items[0].snippet.description){
        console.log('description exists')
        let descriptionArray = props.data.data.items[0].snippet.description.split("/n")
        return descriptionArray
      } else {
        return []
      }
  })
  const player = ref(null);

    function play() {
      player.value.playVideo();
    }
    
</script>