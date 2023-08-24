<script setup>
definePageMeta({
  middleware: ['auth'],
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const data = user.value.user_metadata;

const salutation = ref(data.salutation);
const firstname = ref(data.firstname);
const lastname = ref(data.lastname);
const email = ref(user.value.email);
const disableBtn = ref(true);

watch([salutation, firstname, lastname, email], () => disableBtn.value = false)

async function update () {
  try {
    const { error } = client.auth.updateUser({
      email: email.value,
      data: {
        firstname: firstname.value,
        lastname: lastname.value,
        salutation: salutation.value,
      },
    })

    if(error) throw error;
  } catch (error) {
    console.log(error.message)
  }
}

function onCancel () {
  if (confirm('Are you sure?')) {
    salutation.value = data.salutation;
    firstname.value = data.firstname;
    lastname.value = data.lastname;
    email.value = user.value.email;
  }
}
</script>

<template>
  This is edit page
  
  <WidgetsUserForm 
    v-model:salutation="salutation" 
    v-model:firstname="firstname"
    v-model:lastname="lastname"
    v-model:email="email"
    />

  <button class="btn" @click="update" :disabled="disableBtn">Save & Update</button>
  <button class="btn" @click="onCancel" :disabled="disableBtn">Cancel</button>
</template>
