let templates = [];

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
    templateSelect.innerHTML = '<option value="">Select a template</option>';
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
        document.getElementById('templateDisplay').innerHTML = '';
        document.getElementById('inputFields').innerHTML = '';
    }
}

function generateInputFields(template) {
    const regex = /<([^>]+)>/g;
    let match;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = '';

    while ((match = regex.exec(template)) !== null) {
        const div = document.createElement('div');
        div.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = match[1] + ':';
        label.className = 'mr-2';

        const input = document.createElement('input');
        input.type = 'text';
        input.id = match[1];
        input.placeholder = 'Enter ' + match[1];
        input.className = 'form-control';

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
    document.getElementById('templateDisplay').innerHTML = '';
    document.getElementById('inputFields').innerHTML = '';
}

function resetTemplates() {
    templates = [];
    saveTemplatesToLocalStorage();
    updateTemplateSelect();
    document.getElementById('templateDisplay').innerHTML = '';
    document.getElementById('inputFields').innerHTML = '';
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
