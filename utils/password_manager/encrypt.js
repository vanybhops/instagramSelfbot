let tweetnacl_util = require("tweetnacl-util")
let tweetnacl = require("tweetnacl")
tweetnacl.sealedbox = require('tweetnacl-sealedbox-js');
const crypto = require("crypto");


let index = 1; 
let sealbox_overhead = 48;
let max_bytes = 32;
let tag_len = 16;
let length = 2;


function hex_tester(number) {
    var b = [];
    for (var c = 0; c < number.length; c += 2)
        b.push(parseInt(number.slice(c, c + 2), 16));
    return new Uint8Array(b)
}
async function encrypt(key_id, public_key, encoded_pass, encoded_timestamp) {
    encoded_pass = tweetnacl_util.decodeUTF8(encoded_pass)
    encoded_timestamp = tweetnacl_util.decodeUTF8(encoded_timestamp)
    var f = 100 + encoded_pass.length;
    var new_public_key = hex_tester(public_key);
    var password_result = new Uint8Array(f)
      , t = 0;
    password_result[t] = index;
    t += index;
    password_result[t] = key_id;
    t += index;
    public_key = {
        length: max_bytes * 8,
        name: "AES-GCM"
    };
    var u = {
        additionalData: encoded_timestamp,
        iv: new Uint8Array(12),
        name: "AES-GCM",
        tagLen: tag_len
    }
      , v = crypto;
    return v.subtle.generateKey(public_key, !0, ["encrypt", "decrypt"]).then(async function(a) {
        var c = v.subtle.exportKey("raw", a);
        a = v.subtle.encrypt(u, a, encoded_pass.buffer);
        return Promise.all([c,a])
    }).then(function(a) {
        var b = new Uint8Array(a[0]);
        b = tweetnacl.sealedbox.seal(b, new_public_key);
        password_result[t] = b.length & 255;
        password_result[t + 1] = b.length >> 8 & 255;
        t += length;
        password_result.set(b, t);
        t += max_bytes;
        t += sealbox_overhead;
        if (b.length !== max_bytes + sealbox_overhead)
            throw new Error("encrypted key is the wrong length");
        b = new Uint8Array(a[1]);
        a = b.slice(-16);
        b = b.slice(0, -16);
        password_result.set(a, t);
        t += 16;
        password_result.set(b, t);
        encoded_to_b64 = tweetnacl_util.encodeBase64(password_result)
        return encoded_to_b64
    })
}
module.exports = encrypt