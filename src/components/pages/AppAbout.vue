<script setup lang="ts"></script>

<template>
  <div class="prose">
    <p><strong>Senior Frontend Software Engineer Take-Home Technical Test Overview</strong></p>
    <p>
      This take-home test is designed to evaluate your ability to design, implement and deploy a
      simple Frontend Web Application.
    </p>
    <p>
      Please create a Web Application that ingests Transformer asset data from a JSON dataset and
      visualizes this to the user in both a tabular and line-chart format.
    </p>
    <p>The application should meet the following requirements:</p>
    <p>1. <strong>Programming Languages/Frameworks</strong>:</p>
    <p>
      Our preferred choice of frontend languages/frameworks are TypeScript and Vue3. However, you
      are free to use other languages and/or frameworksthat you are most comfortable with.
    </p>
    <p>2. <strong>Data</strong>:</p>
    <p>
      The attached sampledata.json file contains a data set of 5 transformers. This data shall be
      used for the exercise.
    </p>
    <p>
      You are free to decide how to ingest this data into your application.
      <strong><em>Bonus points</em></strong
      >for the most comprehensive method of ingesting the data.
    </p>
    <p><strong>3. UI Components</strong></p>
    <p>The web application shall contain the following UI components:</p>
    <p>
      1. A table containing all transformers in the data set. Note: Only the “name”, “region” and
      “heath” fields are required to be displayed in the table.
      <strong><em>Bonus points</em></strong> for adding options such as filtering or search.
    </p>
    <p>2. A single line chart:</p>
    <p>• containing a unique line for each transformer, which shows all</p>
    <p>voltage readings for the transformer.</p>
    <p>• The ‘x’ axis shall contain the time and the ‘y’ axis shall contain the</p>
    <p>voltage readings.</p>
    <p>• Includes check boxes forselecting/deselecting transformers.</p>
    <p>
      You have freedom on the style and layout of the UI components and any frameworks/libraries
      used. <strong><em>Bonus points</em></strong
      >for additionalstyling or interaction between components.
    </p>
    <p><strong>4. State Management</strong></p>
    <p>
      The application shall implement internal state management so that state (such as the line
      chart selections and table filtering/search) is persistent across multiple browser tabs.
    </p>
    <p>
      5. <strong>Build, package and deployment</strong>:<br />o This exercise shall also test your
      ability to build, package and deploy software applications. Please provide scripts and
      instructions that cover the building and execution of the software.
      <em>Note: A containerised solution using Docker is preferrable.</em>
    </p>
    <p><strong>Deliverables</strong></p>
    <p>1. <strong>Source Code</strong>:</p>
    <p>The complete source code of the application.</p>
    <p>Any deployment scripts required to launch the application.</p>
    <p>
      A README.md file with instructions on how to set up and launch the application.
      <strong>Evaluation Criteria</strong>
    </p>
    <p>1. <strong>Code Quality</strong>:</p>
    <p>Clean, readable, and well-documented code.</p>
    <p>Appropriate use of language features.</p>
    <p>2. <strong>Functionality</strong>:</p>
    <p>Correct and efficient data retrieval.</p>
    <p>Accurate and appealing data visualization.</p>
    <p>Smooth setup and deployment process.</p>
    <p>Clear instructions and ease of use.</p>
    <p>3. <strong>Deployment</strong>:</p>

    <p><strong>Submission</strong></p>
    <p>
      Please submit your completed test by sending an email to darko.mirkovic@camlingroup.com and
      ivan.pavlovic@camlingroup.com and providing a link to a GitHub. Reach out to
      darko.mirkovic@camlingroup.com if there is any unclarity in the requirements.
    </p>
    <p>
      <em
        >Please ensure that all instructions for setup and running the application are included in
        the README.md file.</em
      >
    </p>
  </div>
</template>

<style scoped></style>
