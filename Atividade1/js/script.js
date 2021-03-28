$(function() {
    const tbody = $("section .alerts");
    var warframe;
    $input = $("input:text");

    function obterTodosLancamentos() {
        // $.ajax('https://api.warframestat.us/pc/alerts', {
        //     type: 'GET',
        //     dataType: 'json',
        //     crossDomain: true,
        //     success: function(dados) {
        //         mostrarAlerta(dados)
        //     }
        // })
        $('#btn-search').click( function(e) {
            // let search = $('input').text;
            $.ajax('https://api.warframestat.us/items/search/' + $input.val(), {
                type: 'GET',
                dataType: 'json',
                crossDomain: true,
                success: function(dados) {
                    mostrarResultadoPesquisa(dados)
                }
            })
        })
        $.ajax('https://api.warframestat.us/pc/fissures', {
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function(dados) {
                mostrarAtividades(dados)
            }
        })
    }

    obterTodosLancamentos()

    function mostrarAtividades(dados) {
      let url;
      $.each(dados, function(i, el) {
        switch(el["tier"]) {
          case "Lith": 
            url = "https://static.wikia.nocookie.net/warframe/images/a/ae/VoidProjectionsIronD.png/revision/latest?cb=20180628175604&path-prefix=pt";
            break;
          case "Neo":
            url = "https://static.wikia.nocookie.net/warframe/images/c/c5/VoidProjectionsSilverD.png/revision/latest?cb=20180628175707&path-prefix=pt";
            break;
          case "Meso":
            url = "https://static.wikia.nocookie.net/warframe/images/1/12/VoidProjectionsBronzeD.png/revision/latest?cb=20180628175639&path-prefix=pt";
            break;
          case "Axi":
            url = "https://static.wikia.nocookie.net/warframe/images/0/0e/VoidProjectionsGoldD.png/revision/latest?cb=20180628175730&path-prefix=pt";
            break;
          case "Requiem":
            url = "https://static.wikia.nocookie.net/warframe/images/c/c6/RequiemR0.png/revision/latest?cb=20191102024523";
            break;
        }
        
        tbody.append(`<div>
                        <img src="${url}">
                      <div>
                      <div>
                        <td>${el["node"]}</td>
                      </div>
                      <div>
                        <td>${el["missionType"]} - ${el["enemy"]}</td>
                      </div>
                      <div>
                        <td>Fenda ${el["tier"]}</td>
                      </div>
                      <div>
                        <td>${el["eta"]}</td>
                      </div><br>
                      `)
      })
    }

    function mostrarResultadoPesquisa(dados) {
      let achou = false;
      $.each(dados, function(i, el) {  
        if (el["category"] === "Warframes" 
        && el["name"].toUpperCase() === $input.val().toUpperCase())  {
          $('.resultado').html(`  <div>
                                    <img src="${el["wikiaThumbnail"]}">
                                  <div>
                                  <div>
                                    <p>Descrição: ${el["description"]}</p>
                                  <div>
                                  <div>
                                    <p>Habilidade 1: ${el["abilities"][0]["name"]}</p>
                                    <p>Descrição: ${el["abilities"][0]["description"]}</p>
                                  <div>
                                  <div>
                                    <p>Habilidade 2: ${el["abilities"][1]["name"]}</p>
                                    <p>Descrição: ${el["abilities"][1]["description"]}</p>
                                  <div>
                                  <div>
                                    <p>Habilidade 3: ${el["abilities"][2]["name"]}</p>
                                    <p>Descrição: ${el["abilities"][2]["description"]}</p>
                                  <div>
                                  <div>
                                    <p>Habilidade 4: ${el["abilities"][3]["name"]}</p>
                                    <p>Descrição: ${el["abilities"][3]["description"]}</p>
                                  <div>
                                  <div>
                                    <p>Passiva: ${el["passiveDescription"]}</p>
                                  <div>
                                  <div>
                                    <p>Health: ${el["health"]}</p>
                                  <div>
                                  <div>
                                    <p>Shield: ${el["shield"]}</p>
                                  <div>
                                  <div>
                                    <p>Armor: ${el["armor"]}</p>
                                  <div>
                                  <div>
                                    <p>Power: ${el["power"]}</p>
                                  <div>
                                  <div>
                                    <p>Mastery required: ${el["masteryReq"]}</p>
                                  <div>
                                  <div>
                                    <p>Sprint speed: ${el["sprintSpeed"]}</p>
                                  <div>`)
          achou = true
          return 0;
        }
      })
      if (!achou) {
        alert("Item não encontrado");
      }
    }

    function mostrarAlerta(dados) {
        $.each(dados, function(i, el) {
            tbody.append(`<div>
                          <img src="${el["mission"]["reward"]["thumbnail"]}">
                          <div>
                            <th>${el["mission"]["node"]}</th>
                          </div>
                          <div>
                            <td>${el["mission"]["type"]} - ${el["mission"]["faction"]}</td>
                          </div>
                          <div>
                            <td>Nível ${el["mission"]["minEnemyLevel"]}-${el["mission"]["maxEnemyLevel"]}</td>
                          </div>
                          <div>
                            <td>Recompensa: ${el["mission"]["reward"]["credits"]}</td>
                            <td>${el["mission"]["reward"]["itemString"]}</td>
                          </div>
                          <div>
                            <td>${el["eta"]}</td>
                          </div>
                        </div><br>`)
        })
    }
})