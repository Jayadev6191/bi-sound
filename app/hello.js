/*
 * Copyright 2016 Sony Corporation
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions, and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

/**
 * The callback to prepare a segment for play.
 * @param  {string} trigger The trigger type of a segment.
 * @param  {object} args    The input arguments.
 */
da.segment.onpreprocess = function (trigger, args) {
    console.log('onpreprocess', { trigger: trigger, args: args });
    console.log('------------------------------------------------------------');
    var obj = { trigger: trigger, args: args };
    var str = JSON.stringify(obj);
    console.log(str);
    console.log(args);
    console.log('------------------------------------------------------------');


    da.startSegment(trigger, args);
};

/**
 * The callback to start a segment.
 * @param  {string} trigger The trigger type of a segment.
 * @param  {object} args    The input arguments.
 */
da.segment.onstart = function (trigger, args) {
    console.log('onstart', { trigger: trigger, args: args });
    var synthesis = da.SpeechSynthesis.getInstance();

    console.log('===================================================================');
    console.log(args);
    console.log('===================================================================');
    if(args!==undefined && args.recognitionSetString !== undefined){
      speechObj = JSON.parse(args.recognitionSetString);
      speechStr = speechObj.SemanticAnalysisResults[0].SpeechRecogResult;
      console.log(speechStr);

      if(speechStr.includes("sony")){

      }
      if(speechStr.includes("jay")){
        synthesis.speak('Syncing Jay', {
            onstart: function () {
                console.log('speak onstart');
                var name = "jay";
                var xhr = da.getXhr();
                xhr.open("GET", "http://nodejs.cyrus.me:3000/api/streaming?name="+name, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var audio = new Audio(xhr.responseText);
                            audio.play();
                            console.log(xhr.responseText);
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error("failed");
                    console.error(xhr.statusText);
                };
                xhr.send(null);
            },
            onend: function () {
                console.log('speak onend');
                da.stopSegment();
            },
            onerror: function (error) {
                console.log('speak cancel: ' + error.messsage);
                da.stopSegment();
            }
        });
      }else if(speechStr.includes("sony")){
        synthesis.speak('Syncing sony', {
            onstart: function () {
                console.log('speak onstart');
                var name = "david";
                var xhr = da.getXhr();
                xhr.open("GET", "http://nodejs.cyrus.me:3000/api/streaming?name="+name, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            var audio = new Audio(xhr.responseText);
                            audio.play();
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error("failed");
                    console.error(xhr.statusText);
                };
                xhr.send(null);
            },
            onend: function () {
                console.log('speak onend');
                da.stopSegment();
            },
            onerror: function (error) {
                console.log('speak cancel: ' + error.messsage);
                da.stopSegment();
            }
        });
      }else if(speechStr.includes("david")){
        synthesis.speak('Syncing david', {
            onstart: function () {
                console.log('speak onstart');
                var name = "david";
                var xhr = da.getXhr();
                xhr.open("GET", "http://nodejs.cyrus.me:3000/api/streaming?name="+name, true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            var audio = new Audio(xhr.responseText);
                            audio.play();
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error("failed");
                    console.error(xhr.statusText);
                };
                xhr.send(null);
            },
            onend: function () {
                console.log('speak onend');
                da.stopSegment();
            },
            onerror: function (error) {
                console.log('speak cancel: ' + error.messsage);
                da.stopSegment();
            }
        });

      }
      else{
        synthesis.speak('Syncing', {
            onstart: function () {
                console.log('speak onstart');
                var xhr = da.getXhr();
                xhr.open("GET", "http://nodejs.cyrus.me:3000/api/streaming", true);
                xhr.onload = function (e) {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                        } else {
                            console.error(xhr.statusText);
                        }
                    }
                };
                xhr.onerror = function (e) {
                    console.error("failed");
                    console.error(xhr.statusText);
                };
                xhr.send(null);
            },
            onend: function () {
                console.log('speak onend');
                da.stopSegment();
            },
            onerror: function (error) {
                console.log('speak cancel: ' + error.messsage);
                da.stopSegment();
            }
        });
      }
    }
    else{
      synthesis.speak('Syncing', {
          onstart: function () {
              console.log('speak start');
          },
          onend: function () {
              console.log('speak onend');
              da.stopSegment();
          },
          onerror: function (error) {
              console.log('speak cancel: ' + error.messsage);
              da.stopSegment();
          }
      });
    }

    var audio = new Audio("http://listen.radionomy.com/abc-lounge");
    audio.play();

      var xhr = da.getXhr();
      xhr.open("GET", "http://nodejs.cyrus.me:3000/api/streaming", true);
      xhr.onload = function (e) {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  console.log(xhr.responseText);
              } else {
                  console.error(xhr.statusText);
              }
          }
      };
      xhr.onerror = function (e) {
          console.error("failed");
          console.error(xhr.statusText);
      };
      xhr.send(null);

    // var audio = new Audio(xhr.responseText);
    // audio.play()syncup('defaultStream')eak('Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !', {
    //     onstart: function () {
    //         console.log('speak start');
    //     },
    //     onend: function () {
    //         console.log('speak onend');
    //         da.stopSegment();
    //     },
    //     onerror: function (error) {
    //         console.log('speak cancel: ' + error.messsage);
    //         da.stopSegment();
    //     }
    // });
};
