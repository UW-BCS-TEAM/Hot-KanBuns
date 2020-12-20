<div class="accordion" id="projects-accordion">
  <div class="accordion-item">
    <h1 class="accordion-header" id="own-projects">
      <button class="accordion-button collapsed btn-warning" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapse-one" aria-expanded="false" aria-controls="collapse-one">
        My Projects
      </button>
    </h1>
    <div id="collapse-one" class="accordion-collapse collapse" aria-labelledby="heading-one"
      data-bs-parent="#projects-accordion">
      <div class="accordion-body">
        <ul>
          {{#each projects}}
          {{/each}}
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h1 class="accordion-header" id="heading-two">
      <button class="accordion-button collapsed btn-warning" type="button" data-bs-toggle="collapse"
        data-bs-target="#collapse-two" aria-expanded="false" aria-controls="collapse-two">
        Team Projects
      </button>
    </h1>
    <div id="collapse-two" class="accordion-collapse collapse" aria-labelledby="heading-two"
      data-bs-parent="#projects-accordion">
      <div class="accordion-body">
       <ul>
          {{#each projects}}
          {{/each}}
        </ul>
      </div>
    </div>
  </div>
</div>