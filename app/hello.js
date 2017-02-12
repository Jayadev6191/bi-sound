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

      if(speechStr.includes("jay")){
        synthesis.speak('Hello Jay', {
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
      }else if(speechStr.includes("david")){
        synthesis.speak('Hello david', {
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
      else{
        synthesis.speak('Some random sound!', {
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
    }
    else{
      synthesis.speak('Hello!', {
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


    var audio = new Audio('http://www.freesound.org/data/previews/59/59569_571436-lq.mp3');
    audio.play();

    var xhr = da.getXhr();
    xhr.open("GET", "https://itunes.apple.com/jp/rss/topfreeapplications/limit=1/json", true);
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
        console.error(xhr.statusText);
    };
    xhr.send(null);

/*
    synthesis.speak('Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !Hello World !', {
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
    */
};
