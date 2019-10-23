var ndv = [
    "Aw4lsQ6KMMRE9u5Z7rrs6rbeXgx2",
    "Lz2rMwNMtuMSsXiUcpI9GiI24Gp1",
    "SMfHzD9jN1YtvNot6dMVNaz0bj43",
    "h4eRBbFNLggi0B0VL1VlKzSOthL2",
    "n9VCPXoxORQ1oannhWvOtD8md3J2",
    "WYBlm3JdMDZhgUzfNSlGrnXcueA2",
    "HGrkp5Wl5yeSLb5xRhv0R3klDgC2",
    "ndZOvfAVhdfvaG3xZMbzKoNV2Z72",
    "ivptwbfU29S3Bp09NUbx08JoLMl1", 
    "sapzNf1KnFf9AAZ2BNidriZmah02"
]

var ntp = [
    "Dh2rOh7bCnMZQAfq95zzZQFdlY93",
    "GNyTPpwdungV0ZNuADEXOsRKe3V2",
    "nVGsEucgSbgDdiUiSLf4IzcXvi43",
    "DV7nGg7X2QedBi1JErxIG4vuT7L2",
    "JBCmPz3AxnfzcpXjIyIbAQ8SlWI2",
    "SqAVSkPyZ4gtfp83OH6RkDWYH3i1",
    "EF5SD7UQZlZEnm5F9ktrrWv8oFx1",
    "jYTVPHylFVdhwjRQsv3mhmTgbsg2",
    "fVzcQrnAiHbkiy6oNytqpceMl3n1",
    "KUtX80DmqEPwLn1Y6IAHXBpK3Mt2"
]

var VARS;

var ntpjson = [];
var ndvjson = [];

var loadData = [];

for(var i=0; i<ndv.length; i++){
    loadData.push(d3.json("/sleep/"+ndv[i]+".json").then(function(obj){
        ndvjson.push(obj)
    }));
}

for(var i=0; i<ntp.length; i++){
    loadData.push(d3.json("/sleep/"+ntp[i]+".json").then(function(obj){
        ntpjson.push(obj);
    }));
}

function loadAllData(func){
    Promise.all(loadData).then(func);
}