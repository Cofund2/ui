<script setup lang="ts">
  import { ref } from 'vue'

  class UsageFactor {
    name = ""
    f = 1
  }
  
  let calcTypes = {
    recRent: {
      label: "recurring rent split by ressource usage"
    }
  } as {[id: string]: any}
  
  let calcTypeList = Object.keys(calcTypes).map(key => ({key, label: calcTypes[key].label}))
  
  let calcType = ref("recRent")
  

  let rentIntervals = ['weekly', 'monthly', 'yearly']
  let durations = ['minutes', 'hours', 'days', 'weeks']
  let recRent = ref({
    rentInterval: rentIntervals[1], 
    rentAmount: 210,
    rentCurrency: 'NEAR',
    
    yearlyFluct: (new Array(12)).fill(100),
    weeklyFluct: (new Array(7)).fill(100),
    dailyFluct: (new Array(24)).fill(100),
    
    profit: 0, 

    usageFactors: [] as UsageFactor[], 

    minN: {
      n: 1, 
      unit: durations[1], 
    }, 
    expectedDemand: {
      n: 1000, 
      unit: durations[1], 
    }
  })
  
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
      <h3>How do you pay the rent for this resource?</h3>
      <v-select
      label="rent interval"
      variant="outlined"
      v-model="recRent.rentInterval"
      :items="rentIntervals"
      ></v-select>
      <v-text-field
      label="rent amount"
      variant="outlined"
      v-model="recRent.rentAmount"
      > </v-text-field>
      <v-text-field
      label="rent currency"
      variant="outlined"
      v-model="recRent.rentCurrency"
      > </v-text-field>
      <h3>How much profit would you like to make?</h3>
      <p>0.7% is forwarded to the developers and maintainers of this dApp.</p>
      <v-text-field
      label="profit relative to rent"
      variant="outlined"
      suffix="%"
      v-model="recRent.profit"
      ></v-text-field>
      <h3>reservation duration</h3>
      <p>
        Specify the minimal reservation duration. 
      </p>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="6">
            <v-text-field
            label="n"
            variant="outlined"
            v-model="recRent.minN.n"></v-text-field>
          </v-col>
          <v-col 
          cols="6">
            <v-select 
            label="duration unit"
            variant="outlined"
            v-model="recRent.minN.unit"
            :items="durations"></v-select>
          </v-col>
        </v-row>
      </v-container>  
      <h3>Usage factors</h3>
      <p>
        When somebody makes a booking, he will have to state a number for every usage factor. 
        E.g. the number of people. Each additional person will increase the price by f times the price for one person. 
      </p>
      <v-container fluid class='pa-0'>
        <v-row no-gutters
        v-for="(uf, i) in recRent.usageFactors" 
        :key="i">
          <v-col 
          cols="6">
            <v-text-field
            label="name"
            variant="outlined"
            v-model="uf.name"></v-text-field>
          </v-col>
          <v-col 
          cols="6">
            <v-text-field
            label="factor f"
            variant="outlined"
            v-model="uf.f"></v-text-field>
          </v-col>
        </v-row>
      </v-container>  
      <v-btn
          class="button"
          variant="outlined"
          @click="recRent.usageFactors.push(new UsageFactor())"
        >
        add usage factor
      </v-btn>
      <h3> interval & expected demand</h3>
      <p>
        Specify the expected demand over the course of one interval (respecting usage factors)
      </p>
      <h1> tbd interval </h1>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="6">
            <v-text-field
            label="n"
            variant="outlined"
            v-model="recRent.expectedDemand.n"></v-text-field>
          </v-col>
          <v-col 
          cols="6">
            <v-select 
            label="duration unit"
            variant="outlined"
            v-model="recRent.expectedDemand.unit"
            :items="durations"></v-select>
          </v-col>
        </v-row>
      </v-container>  
      <p>
        Cofund will calculate prices based on demand over an interval period. 
        E.g. if you expect different demand in winter and summer, prices in summer will be higher and prices in winter lower.
        If you expect more bookings on the weekend, prices on workdays will be lower. 
        This will ensure a more efficient usage of the ressource. 
      </p>
      <h3>Yearly fluctuation</h3>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
            cols="4"
            :key="i"
            v-for="(item,i) in 12"
          >
            <v-text-field
            background-color="#f0f"
            variant="outlined"          
            suffix="%"
            v-model="recRent.yearlyFluct[i]"
            :label="(new Date(1993, i, 13)).toLocaleString('default', { month: 'long' })"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <h3>Weekly fluctuation</h3>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="4"
          :key="i"
          v-for="(item,i) in 7"
          >
            <v-text-field
            suffix="%"
            variant="outlined"
            v-model="recRent.weeklyFluct[i]"
            :label="(new Date(2022, 8 - 1, 29 - 7 + i)).toLocaleString('default', { weekday: 'long' })"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <h3>Daily fluctuation</h3>
      <v-container fluid class='pa-0'>
        <v-row no-gutters>
          <v-col 
          cols="4"
          :key="i"
          v-for="(item,i) in 24"
          >
            <v-text-field
            suffix="%"
            variant="outlined"
            v-model="recRent.dailyFluct[i]"
            :label="i + ':00'"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </template>
    
    <div class='actions'>
      <v-btn
        id="createButton"
        variant="outlined">
        create
      </v-btn>
    </div>

  </v-form>
</template>


<style lang="less" scoped>
  @import "@/colors";
  h1 {
    text-align: center;
    margin: 2rem; 
  }
  h3 {
    font-weight: bold;
  }

  h3, p {
    margin: 1rem ; 
  }
  
  .button {
    margin: 0 1rem; 
  }
  
  form {
    margin: 2rem 0rem; 
  }

  .actions {
    text-align: center;
    border-top: 0.1rem solid #fff8; 
    padding: 2rem;
    margin: 1rem; 
    v-btn {
      display: inline-block;
    }
  }
  
</style>