function loadJSON(filename, callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', filename, true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
    xobj.send(null);  
 }

function initData() {
    loadJSON('assets/js/data/workexp.json', function(response) {
        // Parse JSON string into object
        var data = JSON.parse(response);
        formatData(data)
    });
}

function formatData(data) {
    let experience_str_left = "";
    let experience_str_right = "";
    let tmp_str = '';
    for(let i = 0; i < data.length; i++) {
        tmp_str = `
        <div class="resume-item">
            <h4>${data[i].role}</h4>
            <h5>${data[i].timeline}</h5>
            <p><em>${data[i].company}</em></p>
            <div>
                ${formatProject(data[i].product)}
            </div>
        </div>
        `;
        if(i % 2 == 0)
            experience_str_left += tmp_str
        else
            experience_str_right += tmp_str
    }

    document.getElementById('resume-left').innerHTML = experience_str_left
    document.getElementById('resume-right').innerHTML = experience_str_right
}

function formatProject(projectData) {
    let proj_str = '';
    for(let j = 0; j < projectData.length; j++) {
        product_name = (projectData[j].title) ? '<b>' + projectData[j].title+':</b>' : '<b>Product:</b> ' + projectData[j].product
        product_link = (projectData[j].link) ? '(<a href="' + projectData[j].link + '">'+ projectData[j].link + "</a>)" : "";
        product_desc = '<li>' + projectData[j].description.join('</li><li>') + '</li>';
        product_tech = (projectData[j].tech) ? '<span><b>Technology Used:</b> '+projectData[j].tech+'</span>' : '';
        proj_str += `
            <div style="margin-bottom: 10px;">
                <p class="text-wrap" width="100%">${product_name} ${product_link}</p>
                <p>
                    ${product_tech}
                    <ul>${product_desc}</ul>
                </p>
            </div>
        `
    }
    return proj_str;
}

initData();