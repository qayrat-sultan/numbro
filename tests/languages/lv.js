'use strict';

var numbro = require('../../numbro'),
    language = require('../../languages/lv-LV');

numbro.language('lv', language);

exports['language:lv'] = {
    setUp: function (callback) {
        numbro.language('lv');
        callback();
    },

    tearDown: function (callback) {
        numbro.language('en-US');
        callback();
    },

    format: function (test) {
        test.expect(16);

        var tests = [
            [10000,'0,0.0000','10 000,0000'],
            [10000.23,'0,0','10 000'],
            [-10000,'0,0.0','-10 000,0'],
            [10000.1234,'0.000','10000,123'],
            [-10000,'(0,0.0000)','(10 000,0000)'],
            [-0.23,'.00','-,23'],
            [-0.23,'(.00)','(,23)'],
            [0.23,'0.00000','0,23000'],
            [1230974,'0.0a','1,2 milj.'],
            [1460,'0a','1 tūkst.'],
            [-104000,'0a','-104 tūkst.'],
            [1,'0o','1.'],
            [52,'0o','52.'],
            [23,'0o','23.'],
            [100,'0o','100.'],
            [1,'0[.]0','1']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numbro(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    currency: function (test) {
        test.expect(4);

        var tests = [
            [1000.234,'$0,0.00','€1 000,23'],
            [-1000.234,'($0,0)','(€1 000)'],
            [-1000.234,'$0.00','-€1000,23'],
            [1230974,'($0.00a)','€1,23 milj.']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numbro(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    percentages: function (test) {
        test.expect(4);

        var tests = [
            [1,'0%','100%'],
            [0.974878234,'0.000%','97,488%'],
            [-0.43,'0%','-43%'],
            [0.43,'(0.000%)','43,000%']
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numbro(tests[i][0]).format(tests[i][1]), tests[i][2], tests[i][1]);
        }

        test.done();
    },

    unformat: function (test) {
        test.expect(9);

        var tests = [
            ['10 000,123',10000.123],
            ['(0,12345)',-0.12345],
            ['(€1,23 milj.)',-1230000],
            ['10 tūkst.',10000],
            ['-10 tūkst.',-10000],
            ['23.',23],
            ['€10 000,00',10000],
            ['-76%',-0.76],
            ['2:23:57',8637]
        ];

        for (var i = 0; i < tests.length; i++) {
            test.strictEqual(numbro().unformat(tests[i][0]), tests[i][1], tests[i][0]);
        }

        test.done();
    }
};