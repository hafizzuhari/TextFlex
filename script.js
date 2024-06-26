let templates = [];
document.getElementById('templateDisplay').innerHTML = "No template selected"
document.getElementById('inputFields').innerHTML = "No template selected"

// Load templates from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTemplatesFromLocalStorage();
    updateTemplateSelect();
});

function addTemplate() {
    const newTemplate = document.getElementById('newTemplate').value;
    if (newTemplate) {
        templates.push(newTemplate);
        saveTemplatesToLocalStorage();
        updateTemplateSelect();
        document.getElementById('newTemplate').value = '';
    } else {
        alert('Please enter a template.');
    }
}

function updateTemplateSelect() {
    const templateSelect = document.getElementById('templateSelect');
    templateSelect.innerHTML = '<option value="99" selected disabled>Select a template</option>';
    templates.forEach((template, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = template;
        templateSelect.appendChild(option);
    });
}

function loadTemplate() {
    const templateIndex = document.getElementById('templateSelect').value;
    if (templateIndex !== '') {
        const template = templates[templateIndex];
        document.getElementById('templateDisplay').innerHTML = template;
        generateInputFields(template);
    } else {
        document.getElementById('templateDisplay').innerHTML = "No template selected"
        document.getElementById('inputFields').innerHTML = "No template selected"
    }
}

function generateInputFields(template) {
    const regex = /<([^>]+)>/g;
    let match;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = '';

    while ((match = regex.exec(template)) !== null) {
        const div = document.createElement('div');
        div.className = 'flex flex-col';

        const label = document.createElement('label');
        label.textContent = titleCase(match[1]);

        const input = document.createElement('input');
        input.type = 'text';
        input.id = match[1];
        input.placeholder = 'Enter ' + match[1];
        input.className = 'w-full rounded-md border-gray-200 px-3 py-2 border border-zinc-200';

        div.appendChild(label);
        div.appendChild(input);
        inputFields.appendChild(div);
    }
}

function updateTemplate() {
    const templateIndex = document.getElementById('templateSelect').value;
    if (templateIndex === '') return;

    let template = templates[templateIndex];
    const regex = /<([^>]+)>/g;
    let match;
    
    while ((match = regex.exec(template)) !== null) {
        const input = document.getElementById(match[1]);
        template = template.replace(`<${match[1]}>`, input.value || `<${match[1]}>`);
    }

    document.getElementById('templateDisplay').innerHTML = template;
}

function copyTemplate() {
    const templateText = document.getElementById('templateDisplay').textContent;
    navigator.clipboard.writeText(templateText).then(() => {
        alert('Template copied to clipboard!');
    });
}

function saveTemplate() {
    const templateText = document.getElementById('templateDisplay').textContent;
    const savedTemplate = document.getElementById('savedTemplate');
    savedTemplate.value = templateText;
}

function deleteTemplate() {
    const templateIndex = document.getElementById('templateSelect').value;
    if (templateIndex === '') {
        alert('Please select a template to delete.');
        return;
    }

    templates.splice(templateIndex, 1);
    saveTemplatesToLocalStorage();
    updateTemplateSelect();
    document.getElementById('templateDisplay').innerHTML = "No template selected"
    document.getElementById('inputFields').innerHTML = "No template selected"
}

function resetTemplates() {
    //templates = [];
    //saveTemplatesToLocalStorage();
    //updateTemplateSelect();
    var templateIndex = document.getElementById('templateSelect');
    templateIndex.selectedIndex = 0
    document.getElementById('templateDisplay').innerHTML = "No template selected"
    document.getElementById('inputFields').innerHTML = "No template selected"
}

function saveTemplatesToLocalStorage() {
    localStorage.setItem('templates', JSON.stringify(templates));
}

function loadTemplatesFromLocalStorage() {
    const storedTemplates = localStorage.getItem('templates');
    if (storedTemplates) {
        templates = JSON.parse(storedTemplates);
    }
}

function titleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}