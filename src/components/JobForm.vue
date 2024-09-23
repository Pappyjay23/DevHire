<script setup>
const formFieldStyles = 'border-b border-[#fff] p-2 outline-none text-[90%]'
</script>

<template>
  <div
    class="p-5 bg-transparent backdrop-blur flex justify-center w-full md:w-[80%] lg:w-[50%] mx-auto rounded-md border border-[#fff]"
  >
    <div class="text-[#fff] w-full">
      <h1 class="text-2xl lg:text-3xl text-white font-bold text-center mb-3 lg:mb-4">Post Job</h1>
      <form action="" class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="job-type" name="job-type" class="font-bold text-white">Job Type</label>
          <select name="job-type" id="job-type" :class="formFieldStyles" class="cursor-pointer">
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="job-title" name="job-title" class="font-bold text-white"
            >Job Listing Title</label
          >
          <input
            type="text"
            name="job-title"
            id="job-title"
            placeholder="eg. Software Engineer"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="description" name="description" class="font-bold text-white"
            >Description</label
          >
          <textarea
            rows="3"
            type="text"
            name="description"
            id="description"
            placeholder="Add any job duties, expectations, requirements, etc"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="salary" name="salary" class="font-bold text-white">Salary</label>
          <select name="salary" id="salary" :class="formFieldStyles" class="cursor-pointer">
            <option value="Under $50K">under $50K</option>
            <option value="$50K - $60K">$50 - $60K</option>
            <option value="$60K - $70K">$60 - $70K</option>
            <option value="$70K - $80K">$70 - $80K</option>
            <option value="$80K - $90K">$80 - $90K</option>
            <option value="$90K - $100K">$90 - $100K</option>
            <option value="$100K - $125K">$100 - $125K</option>
            <option value="$125K - $150K">$125 - $150K</option>
            <option value="$150K - $175K">$150 - $175K</option>
            <option value="$175K - $200K">$175 - $200K</option>
            <option value="Over $200K">Over $200K</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label for="location" name="location" class="font-bold text-white">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="e.g New York"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="company-name" name="company-name" class="font-bold text-white"
            >Company Name</label
          >
          <input
            type="text"
            name="company-name"
            id="company-name"
            placeholder="e.g Microsoft"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="company-description" name="company-description" class="font-bold text-white"
            >Company Description</label
          >
          <textarea
            rows="3"
            type="text"
            name="company-description"
            id="company-description"
            placeholder="What does your company do?"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="company-email" name="company-email" class="font-bold text-white"
            >Contact Email</label
          >
          <input
            type="email"
            name="company-email"
            id="company-email"
            placeholder="eg. companyname@example.com"
            :class="formFieldStyles"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="company-phone" name="company-phone" class="font-bold text-white"
            >Contact Phone</label
          >
          <input
            type="tel"
            name="company-phone"
            id="company-phone"
            placeholder="eg. 617-555-0123"
            :class="formFieldStyles"
          />
        </div>
        <button
          class="py-3 px-8 rounded-[50px] w-[80%] md:w-[50%] lg:w-[4w0%] mx-auto font-semibold bg-[#fff] text-[#127780]"
        >
          Post Job
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
select,
select option,
textarea,
input,
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  background: transparent !important;
  -webkit-text-fill-color: white !important;
  caret-color: white !important;
  transition: background-color 5000s ease-in-out 0s;
}

::placeholder {
  color: white !important;
}

option {
  color: #127780 !important;
}
</style>
