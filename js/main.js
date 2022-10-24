'use strict'
console.log('Starting up')
_renderPortfolio()
$('#sendBtn').click(onSendMsg)


function _renderPortfolio() {
    const projs = getProjs()
    _renderPtflItems(projs)
    _renderPtflModals(projs)
}
function _renderPtflItems(projs) {
    const strHTMLs = projs.map((proj, idx) => `
    <div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${idx + 1}">
        <div class="portfolio-hover">
            <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
            </div>
        </div>
        <img class="img-fluid" src="img/portfolio/${proj.id}.jpg" alt="">
    </a>
    <div class="portfolio-caption">
        <h4>${proj.name}</h4>
        <p class="text-muted">${proj.title}</p>
    </div>
    </div>`)


    $(`#portfolioItems`).html(strHTMLs.join(''))

}
function _renderPtflModals(projs) {
    const strHTMLs = projs.map((proj, idx) => `
   <div class="portfolio-modal modal fade" id="portfolioModal${idx + 1}" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                    <div class="rl"></div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 mx-auto">
                            <div class="modal-body">
                                <h2>${proj.name}</h2>
                                <p class="item-intro text-muted">${proj.title}</p>
                                <div class="modal-flex-container">

                                <img class="img-responsive d-block mx-auto" src="img/portfolio/${proj.id}.jpg" alt="">
                                <div><p>${proj.desc}</p>
                                <ul class="list-inline">
                                <!--    <li>Published at: ${proj.publishedAt}</li>
                                    <li>Labels: ${proj.labels}</li> -->
                                </ul>
                                <a class="btn btn-xl js-scroll-trigger" href="${proj.url}" target="_blank">Take a look!</a>
                                </div></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
   </div>`)

    $(`.portfolio-modals`).html(strHTMLs.join(''))

}

function onSendMsg(ev) {
    ev.preventDefault()
    const usersEmail = $('#formEmail').val()
    const subject = $('#formSubject').val()
    const msg = $('#formMsg').val()
    if (!(msg && subject && usersEmail)) {
        $('.bad-input').show()
        return
    }
    const myEmail = 'mauricio.ein@gmail.com'

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=From ${usersEmail}: ${msg}` //how enter?
    window.open(url)
    $('#formEmail').val('')
    $('#formSubject').val('')
    $('#formMsg').val('')
    $('.bad-input').hide()


}