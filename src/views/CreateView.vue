<script setup lang="ts">
  
  import { ref } from 'vue'
  
  let calcTypes = {
    recRent: {
      label: "recurring rent split by ressource usage"
    }
  } as {[id: string]: any}
  
  let calcTypeList = Object.keys(calcTypes).map(key => ({key, label: calcTypes[key].label}))
  
  let calcType = ref("recRent")
  let rentIntervals = ['yearly', 'monthly', 'weekly']
  let rentInterval = ref(rentIntervals[1]) 
  let rentAmount = ref(210)
  let rentCurrency = ref('NEAR')
  
  let yearlyFluct = ref((new Array(12)).fill(100))
  let weeklyFluct = ref((new Array(7)).fill(100))
  let dailyFluct = ref((new Array(24)).fill(100))
  
</script>

<template>
  <h1> 
    Cofunding a resource
  </h1>
  <p>
    For cofunding a new resource, use this form. 
    A dedicated smart contract will be instanciated for your ressource. 
  </p>
  <v-form>
    <v-select 
    label="calculation type"
    item-title="label"
    item-value="key"
    variant="outlined"
    v-model="calcType"
    :items="calcTypeList"></v-select>
    <template v-if="calcType == 'recRent'" class="calcDetails">
      <p>How do you pay the rent for this resource?</p>
      <v-text-field
      label="rent interval"
      variant="outlined"
      v-model="rentInterval"
      ></v-text-field>
      <v-text-field
      label="rent amount"
      variant="outlined"
      v-model="rentAmount"
      > </v-text-field>
      <v-text-field
      label="rent currency"
      variant="outlined"
      v-model="rentCurrency"
      > </v-text-field>
      <p>Estimate the resource demand in percent</p>
      
      <v-expansion-panels dense>
        <v-expansion-panel>
          <v-expansion-panel-title>
            Yearly fluctuation 
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid>
              <v-row no-gutters>
                <v-col 
                  cols="4"
                  :key="i"
                  v-for="(item,i) in 12"
                >
                  <v-text-field
                  variant="outlined"          
                  suffix="%"
                  v-model="yearlyFluct[i]"
                  :label="(new Date(1993, i, 13)).toLocaleString('default', { month: 'long' })"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            Weekly fluctuation
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid>
              <v-row no-gutters>
                <v-col 
                cols="4"
                :key="i"
                v-for="(item,i) in 7"
                >
                  <v-text-field
                  suffix="%"
                  variant="outlined"
                  v-model="weeklyFluct[i]"
                  :label="(new Date(2022, 8 - 1, 29 - 7 + i)).toLocaleString('default', { weekday: 'long' })"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>
            Daily fluctuation
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-container fluid>
              <v-row no-gutters>
                <v-col 
                cols="4"
                :key="i"
                v-for="(item,i) in 24"
                >
                  <v-text-field
                  suffix="%"
                  variant="outlined"
                  v-model="dailyFluct[i]"
                  :label="i + ':00'"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>
  </v-form>
</template>


<style lang="less" scoped>
  @import "@/colors";
  h1 {
    text-align: center;
  } 
  p {
    margin: 0.5rem 0rem; 
  }
  
  .calcDetails {
    p {
      margin: 0; 
    }
  }
  
  form {
    margin: 2rem 0rem; 
  }
  
</style>