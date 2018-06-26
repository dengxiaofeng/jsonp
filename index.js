/*
* @Author: hbt_dengxiaofeng
* @Date:   2018-06-26 20:44:54
* @Last Modified by:   xiaoc
* @Last Modified time: 2018-06-26 20:58:19
*/

'use strict';

let count = 0 ;

function handle(){}

function jsonp (url,option,fn) {

	if('function' === typeof option) {
		fn = option;
		option= {}
	} 

	if(!option) option = {}

	let prefix = option.prefix || '__jp'

    let id = option.name || (prefix + (count++))

    let param =option.param || 'callback'

    let timeout = null ! = option.timeout ? option.timeout || 60000

    let enc = encodeURIComponent

    let target = document.getElementsByTagName('script')[0] || doucment.head

    let script,timer;

    if(timeout) {
    	timer = setTimeout(() => {
    		cleanup()
    		if(fn) fn(new Error('Timeout'))
    	}, timeout)
    }

    function cleanup() {
    	if(script.parentNode) srcipt.parentNode.removeChild(script)
    	window[id] = handle
        if(timer) clearTimeout(timer)
    }

    function cancel() {
    	if(window[id]) {
    		cleanup()
    	}
    }

    window[id] = (data) => {
        console.log('jsonp get',data)
    	cleanup()
    	if(fn) fn(null, data)
    }

    url + = (~url.indexOf('?') ? '&': '?') + param + '=' + enc(id)

    url + = url.replace('?&','?')

    console.log('jsonp request', url)


    script = document.createElement('script')

    script.src = url

    target.parentNode.insertBefore(script ,target)

    return cancel

}