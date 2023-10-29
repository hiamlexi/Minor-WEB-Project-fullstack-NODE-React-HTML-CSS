<template>
    <div id="mainCoantiner">
        <div class="margin-body">
            <div>
                <div class="starsec"></div>
                <div class="starthird"></div>
                <div class="starfourth"></div>
                <div class="starfifth"></div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <div class="wpb_text_column wpb_content_element ">
                        <div class="wpb_wrapper">
                            <div class="title-h1 text-center"><span><span class="light">Our </span> Policy</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-3 col-md-3 main-column-wrapper">
                    <div class="column">
                        <div class="row">
                            <div class="element-wrapper">
                                <div class="top">
                                    <div class="title1">Respect </div>
                                    <div class="title2">Behavior</div>
                                </div>
                            </div>
                        </div>
                        <div class="rule">
                            <div class="main-rule">Treat all members with courtesy and respect</div>
                        </div>
                        <figure class="bullet">Keep discussions and content relevant to the channel's designated topic
                            or theme.
                            Avoid derailing conversations with unrelated subjects or spamming off-topic content.</figure>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 main-column-wrapper">
                    <div class="column">
                        <div class="row">
                            <div class="element-wrapper">
                                <div class="top">
                                    <div class="title1">Content</div>
                                    <div class="title2">Guidelines</div>
                                </div>
                            </div>
                        </div>
                        <div class="rule">
                            <div class="main-rule">Share content that is safe for all ages.
                            </div>
                        </div>
                        <figure class="bullet">Treat all members with courtesy and respect.
                            Avoid harassment, hate speech, discrimination, or any form of bullying.
                            Refrain from engaging in personal attacks or offensive language.</figure>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 main-column-wrapper">
                    <div class="column">
                        <div class="row">
                            <div class="element-wrapper">
                                <div class="top">
                                    <div class="title1">Privacy </div>
                                    <div class="title2">Safety</div>
                                </div>
                            </div>
                        </div>
                        <div class="rule">
                            <div class="main-rule">Be cautious about clicking on links from unverified sources.
                            </div>
                        </div>
                        <figure class="bullet">Share content that is safe for all ages.
                            Do not post explicit or NSFW (Not Safe For Work) material.
                            Avoid spamming or posting unrelated content.</figure>
                    </div>
                </div>
                <div class="col-sm-3 col-md-3 main-column-wrapper">
                    <div class="column">
                        <div class="row">
                            <div class="element-wrapper">
                                <div class="top">
                                    <div style=" " class="title1">Topic</div>
                                    <div class="title2" style="display:inline-block;">Relevance</div>
                                </div>
                            </div>
                        </div>
                        <div class="rule">
                            <div class="main-rule">No spamming off-topic content</div>
                        </div>
                        <figure class="bullet">Do not share personal information, such as addresses, phone numbers, or
                            social security numbers.
                            Report any suspicious or harmful behavior to the moderation team.
                            Be cautious about clicking on links from unverified sources.</figure>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: 'policy'
}
</script>

<style>
body {
    background-color: #181828;
}

#mainCoantiner {
    background-image: url("https://1.bp.blogspot.com/-Fo3iRt97ZXY/XvSG4EMwi0I/AAAAAAAAVEo/mrApRTcVVRk1m-fX9K-ffNwRUXlHUocdwCLcBGAsYHQ/s1600/h.jpg");

    background-color: #181828;
    height: 100%;
    width: 100%;
    padding-bottom: 50px;
}

.mystyleSec {
    background-image: url(http://thepatternlibrary.com/img/h.jpg);
}

.mystylethird {
    background-image: url("https://www.toptal.com/designers/subtlepatterns/patterns/binding_dark.png");
}

.main-header {
    top: 0;
    left: 0;
    z-index: 20;
    -webkit-transform: translate3d(0, 0, 0);
    height: 70px;
    width: 100%;
    bottom: inherit;
    text-align: center;
    background: rgba(28, 31, 47, 0.16);
    overflow: hidden;
    border: 1px solid #2e344d;
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
    box-shadow: 10px 10px 36px rgb(0, 0, 0, 0.5), -13px -13px 23px rgba(255, 255, 255, 0.03);
    border-width: 1px 0px 0 1px;
}

.folio-btn {
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.03);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    right: 0;
    height: 70px;
    width: 70px;
}

.folio-btn-item {
    position: absolute;
    width: 40px;
    height: 40px;
    left: 15px;
    top: 15px;
}

.folio-btn-dot {
    float: left;
    width: 33.3%;
    height: 33.3%;
    position: relative;
}

.folio-btn-dot:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 4px;
    height: 4px;
    margin: -2px 0 0 -2px;
    border-radius: 50%;
    transition: all 300ms linear;
    transform: scale(1.0);
}

.folio-btn-dot:before {
    background: #00BCD4;
}

.folio-btn:hover .folio-btn-dot:first-child:before,
.folio-btn:hover .folio-btn-dot:nth-child(3):before,
.folio-btn:hover .folio-btn-dot:nth-child(4):before,
.folio-btn:hover .folio-btn-dot:nth-child(8):before {
    transform: scale(1.8);
    opacity: 0.5;
}

.header-social {
    position: absolute;
    z-index: 20;
    width: auto;
    bottom: 17px;
    right: 90px;
    padding: 0;
    min-width: 140px;
    box-shadow: 3px 9px 16px rgb(0, 0, 0, 0.4), -3px -3px 10px rgba(255, 255, 255, 0.06), inset 14px 14px 26px rgb(0, 0, 0, 0.3), inset -3px -3px 15px rgba(255, 255, 255, 0.05);
    border-width: 1px 0px 0px 1px;
    border-style: solid;
    border-color: #2e344d;
}

.header-social:before {
    background: #00BCD4;
}

.header-social:before {
    content: '';
    position: absolute;
    left: 50%;
    top: -3px;
    width: 36px;
    margin-left: -18px;
    height: 6px;
}

.header-social li {
    display: block;
    float: left;
    margin-top: 0;
}

.header-social li a {
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    font-size: 12px;
    border-style: solid;
    color: rgba(255, 255, 255, 0.41);
    border: 1px solid rgba(255, 255, 255, 0.08);
    transition: all 300ms linear;
}

.header-social li a:hover {
    color: #00BCD4;
    cursor: pointer;
}

ul,
li {
    border: none;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    text-decoration: none;
    margin: 0;
    padding: 0;
}

ol,
ul {
    list-style: none;
}

.main-header:before {
    content: '';
    position: absolute;
    left: 10px;
    width: 60px;
    height: 1px;
    bottom: 120px;
    background: rgba(255, 255, 255, 0.1);
}

.title-h1 {
    margin-top: 0.5em;
    margin-bottom: 1.4em;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: inherit;
    color: #ffffff;
    font-size: 38px;
}

.title-h1 .light {
    font-weight: normal;
}

.element-wrapper {
    background-color: rgba(71, 71, 72, 0.2);
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    padding-top: 45px;
    padding-bottom: 34px;
    text-align: center;
    box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.13), -20px -20px 60px rgba(29, 29, 29, 0.08);
}

.top {
    background-color: #393b4a;
    background-color: #00bcd4;
    -webkit-box-shadow: 0px 0px 0px 10px rgba(0, 188, 212, 0.31);
    -moz-box-shadow: 0px 0px 0px 10px rgba(0, 188, 212, 0.31);
    box-shadow: 0px 0px 0px 10px rgba(0, 188, 212, 0.31);
    color: #fff;
    border-radius: 50%;
    height: 180px;
    width: 180px;
    display: inline-block;
    padding-top: 46px;
}

.title1 {
    font-size: 50px;
    font-weight: 300;
    line-height: 1;
}
 .title2 {
    font-size: 24px;
    font-weight: 300;
}

.rule {
    background-color: #303241;
    padding: 26px 10px;
    text-align: center;
}

.main-rule {
    color: #00bcd4;
    line-height: 38px;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
}

.pricing-table .bullet {
    background-color: #e9eaf2;
}

figure.bullet:first-of-type {
    padding-top: 15px;
}

.bullet {
    padding: 5px 10px;
}

figure {
    margin: 0;
    display: block;
}

figure {
    display: block;
    padding-block-start: 0.4em;
    padding-block-end: 0.4em;
    padding-inline-start: 40px;
    padding-inline-end: 40px;
    background-color: rgba(51, 51, 51, 0.4117647058823529);
    text-align: left;
}

.bullet:before {
    vertical-align: middle;
    content: "\f058";
    font-family: "Font Awesome 5 Free";
    color: #00bfa5;
    text-align: center;
    padding-right: 10px;
}

.strike:before {
    content: none;
}

.main-rule {
    color: #00bcd4;
}

body {
    color: #5f727f;
}

.column {
    float: none;
    display: inline-block;
    text-align: left;
    vertical-align: top;
    margin-bottom: 42px;
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}

.main-column-wrapper {
    min-width: 271px;
    text-align: center;
}

.rule {
    background-color: rgba(237, 238, 241, 0.2);
}

.margin-body {
    position: relative;
    width: 90%;
    box-sizing: border-box;
    margin: auto;
}

.bullet {
    border-top: 1px solid #7273723b;
}

.element-wrapper {
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
    padding-top: 45px;
}

.main-column-wrapper+.main-column-wrapper .top {
    background-color: #a637ec;
    -webkit-box-shadow: 0px 0px 0px 10px rgba(166, 55, 236, 0.31);
    -moz-box-shadow: 0px 0px 0px 10px rgba(166, 55, 236, 0.31);
    box-shadow: 0px 0px 0px 10px rgba(166, 55, 236, 0.31);
}

.strike {
    text-decoration: line-through;
    color: #99a9b5;
}

.main-column-wrapper+.main-column-wrapper .main-rule {
    color: #a637ec;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .main-rule {
    color: #ee417c;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .top {
    background-color: #ee417c;
    -webkit-box-shadow: 0px 0px 0px 10px rgba(238, 65, 124, 0.31);
    -moz-box-shadow: 0px 0px 0px 10px rgba(238, 65, 124, 0.31);
    box-shadow: 0px 0px 0px 10px rgba(238, 65, 124, 0.31);
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .main-rule {
    color: #ff994e;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .top {
    background-color: #ff994e;
    -webkit-box-shadow: 0px 0px 0px 10px rgba(255, 153, 78, 0.31);
    -moz-box-shadow: 0px 0px 0px 10px rgba(255, 153, 78, 0.31);
    box-shadow: 0px 0px 0px 10px rgba(255, 153, 78, 0.31);
}

.main-column-wrapper+.main-column-wrapper .bullet:before {
    color: #a637ec;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .bullet:before {
    color: #ee417c;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .bullet:before {
    color: #ff994e;
}

.gem-button {
    cursor: pointer;
    border-width: 2px;
    line-height: 36px;
    border-style: solid;
    background: transparent;
    height: 40px;
    line-height: 40px;
    padding: 0 17px;
    font-size: 14px;
    margin: 25px;
    position: relative;
    display: inline-block;
    text-align: center;
    text-transform: uppercase;
    white-space: nowrap;
    vertical-align: middle;

}

.gem-green {
    border-radius: 0px;
    border-color: rgb(0, 188, 212);
    color: rgb(0, 188, 212) !important;
}

.gem-green:hover {
    background-color: rgb(0, 188, 212);
    color: rgb(255, 255, 255) !important;
}

.gem-purpel {
    border-radius: 0px;
    border-color: rgb(166, 55, 236);
    color: rgb(166, 55, 236) !important;
}

.gem-purpel:hover {
    background-color: #a637ec;
    color: rgb(255, 255, 255) !important;
}

.gem-orange {
    border-radius: 0px;
    border-color: #ee417c;
    color: #ee417c !important;
}

.gem-orange:hover {
    background-color: #ee417c;
    color: rgb(255, 255, 255) !important;
}

.gem-yellow {
    border-radius: 0px;
    border-color: #ff994e;
    color: #ff994e !important;
}

.gem-yellow:hover {
    background-color: #ff994e;
    color: rgb(255, 255, 255) !important;
}

.gem-button-position-center {
    text-align: center;
    display: block;
    background-color: rgba(0, 0, 0, 0.16862745098039217);
    border-radius: 0px 0px 10px 10px;
}

.column:hover .element-wrapper {
    box-shadow: 0px 35px 80px rgba(4, 255, 236, 0.25), 0px 0px 0px rgba(10, 197, 173, 0.33);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}

.column:hover {
    overflow: hidden;
}

.main-column-wrapper+.main-column-wrapper .column:hover .element-wrapper {
    box-shadow: 0px 35px 80px rgba(230, 2, 241, 0.34), 0px 0px 0px rgba(21, 21, 20, 0.79);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .column:hover .element-wrapper {
    box-shadow: 0px 35px 80px rgba(255, 4, 166, 0.25), 0px 0px 0px rgba(222, 6, 84, 0.33);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}

.main-column-wrapper+.main-column-wrapper+.main-column-wrapper+.main-column-wrapper .column:hover .element-wrapper {
    box-shadow: 0px 35px 80px rgba(195, 175, 148, 0.34), 0px 0px 0px rgba(21, 21, 20, 0.79);
    -webkit-transition: all 0.3s ease-in-out 0s;
    -moz-transition: all 0.3s ease-in-out 0s;
    -ms-transition: all 0.3s ease-in-out 0s;
    -o-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
}
@media screen and(max-width:300px) {
    .mainCoantiner .rule .bullet .main-column-wrapper .column{
        overflow: hidden;
        overflow-block: hidden;
    }
}
</style>
