"use strict";
$.widget("fernleaf.item", {
    options: {
        station: "",
        sdate: "por",
        edate: (new Date).getFullYear() + "-12-31",
        variable: "precipitation",
        threshold: 1,
        thresholdOperator: ">",
        thresholdFilter: "",
        thresholdFunction: void 0,
        window: 1,
        dailyValueValidator: void 0,
        yearValidator: void 0,
        barColor: "#307bda",
        dataAPIEndpoint: "https://data.rcc-acis.org/"
    },
    _variables: {
        precipitation: {
            queryElements: [{
                name: "pcpn",
                units: "inch"
            }],
            windowBehavior: "rollingSum"
        },
        tmax: {
            queryElements: [{
                name: "maxt",
                units: "degreeF"
            }],
            windowBehavior: "all"
        },
        tmin: {
            queryElements: [{
                name: "mint",
                units: "degreeF"
            }],
            windowBehavior: "all"
        },
        tavg: {
            queryElements: [{
                name: "avgt",
                units: "degreeF"
            }],
            windowBehavior: "all"
        }
    },
    _dailyValues: null,
    _operators: {
        "==": function(e, t) {
            return e == t
        },
        ">=": function(e, t) {
            return t <= e
        },
        ">": function(e, t) {
            return t < e
        },
        "<=": function(e, t) {
            return e <= t
        },
        "<": function(e, t) {
            return e < t
        }
    },
    _views: {},
    _filters: {
        KtoC: function(e) {
            return e + 273.15
        },
        CtoK: function(e) {
            return e - 273.15
        },
        FtoC: function(e) {
            return 9 * e / 5 + 32
        },
        CtoF: function(e) {
            return 5 * (e - 32) / 9
        },
        InchToCM: function(e) {
            return 2.54 * e
        },
        CMtoInch: function(e) {
            return e / 2.54
        },
        DaytoWeek: function(e) {
            return e / 7
        },
        WeektoDay: function(e) {
            return 7 * e
        },
        DaytoYear: function(e) {
            return e / 365
        },
        YeartoDay: function(e) {
            return 365 * e
        }
    },
    _create: function() {
        $(this.element).addClass("fl-item"), this.update()
    },
    update: function() {
        var t = this;
        _.forEach(this._views, function(e) {
            e.remove()
        }), this._views = {};
        var e = void 0;
        null === this._dailyValues && (e = Promise.resolve(this._getDailyValuesByStation()).then(function(e) {
            t._dailyValues = e
        })), Promise.resolve(e).then(function() {
            t._showExceedanceTimelineGraph(t._dailyValues)
        })
    },
    _setOption: function(e, t) {
        "threshold" === e && this.options.thresholdFilter in this._filters && (t = this._filters[this.options.thresholdFilter](t)), "sdate" === e && (t = t ? String(t).slice(0, 4) + "-01-01" : "por"), "edate" === e && (t = void 0 === t || parseInt(String(t).slice(0, 4)) >= parseInt((new Date).getFullYear()) ? String(parseInt((new Date).getFullYear()) - 1) + "-12-31" : String(t).slice(0, 4) + "-12-31"), this._super(e, t), ["station", "variable", "sdate", "edate"].includes(e) && this._clearData()
    },
    getDailyValues: function() {
        return this._dailyValues
    },
    _getDailyValuesByStation: function() {
        var t = this;
        return this._updateSpinner("loading data..."), Promise.resolve($.ajax({
            url: this.options.dataAPIEndpoint + "StnData",
            type: "POST",
            context: this,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                sid: this.options.station,
                sdate: this.options.sdate,
                edate: this.options.edate,
                elems: this._variables[this.options.variable].queryElements
            })
        })).then(function(e) {
            var n = "function" == typeof t.options.dailyValueValidator ? t.options.dailyValueValidator : function(e, t, i) {
                return Number.isFinite(e)
            };
            return _.mapValues(_.fromPairs(e.data), function(e, t, i) {
                return "T" === e && (e = "0"), -999 == (e = Number.parseFloat(e)) && (e = Number.NaN), {
                    value: e,
                    valid: n(e, t, i)
                }
            })
        })
    },
    getYearExceedance: function(o) {
        var s = this,
            a = void 0;
        return a = "precipitation" === this.options.variable ? this._precip_year_validator : this._temp_year_validator, "function" == typeof this.options.yearValidator && (a = this.options.yearValidator), _.chain(o).reduce(function(e, t, i) {
            var n = String(i).slice(0, 4);
            return e[n] = e[n] || {}, e[n][i] = t, e
        }, {}).mapValues(function(e, t, i) {
            var n = _.reduce(e, function(e, t, i) {
                var n = [];
                t.valid && n.push(t.value);
                for (var a = s.options.window - 1; 0 < a; a--) {
                    var r = new Date(i);
                    r.setDate(r.getDate() - a), r = r.toISOString().slice(0, 10), void 0 !== o[r] && o[r].valid && n.push(o[r].value)
                }
                return 0 < n.length && s._thresholdFunction(n) ? e + 1 : e
            }, 0);
            return {
                exceedance: n,
                valid: a(n, e, t, i, o),
                dailyValues: e
            }
        }).value()
    },
    _thresholdFunction: function(e) {
        var t = this;
        if ("function" === this.options.thresholdFunction) return this.options.thresholdFunction(this, e);
        var i = this._operators[this.options.thresholdOperator];
        switch (this._variables[this.options.variable].windowBehavior) {
            case "rollingSum":
                return i(_.sum(e), this.options.threshold);
            case "any":
                return _.any(e, function(e) {
                    return i(e, t.options.threshold)
                });
            case "all":
                return _.every(e, function(e) {
                    return i(e, t.options.threshold)
                })
        }
    },
    _updateSpinner: function() {
        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
            t = $(this.element).children("div.spinner");
        t.length ? "" === e || !1 === e ? t.remove() : t.children(".msg").text(e) : !1 !== e && $(this.element).append('<div class="spinner"><i class="spinner-icon"></i><span class="sr-only">Loading...</span><span class="msg">' + e + "</span></div>")
    },
    _showExceedanceTimelineGraph: function(e) {
        if (this._updateSpinner(!1), _.forEach(this._views, function(e) {
                e.hide()
            }), void 0 === this._views.$yearlyExceedanceGraph) {
            var t = 0,
                i = this.getYearExceedance(e),
                n = _(i).toPairs().map(function(e) {
                    return e[1].valid && t++, {
                        x: String(e[0]),
                        y: e[1].valid ? e[1].exceedance : Number.NaN
                    }
                }).sortBy("x").value();
            this.exceedanceByYear = n, console.log("Valid years: " + t), this._views.$yearlyExceedanceGraph = $("<canvas height='40vh' width='80vw'></canvas>").uniqueId().appendTo(this.element), Chart.plugins.register({
                beforeDraw: function(e) {
                    var t = e.chart.ctx;
                    t.fillStyle = "white", t.fillRect(0, 0, e.chart.width, e.chart.height)
                }
            }), this.chart = new Chart(this._views.$yearlyExceedanceGraph, {
                label: "Yearly Exceedance",
                type: "bar",
                animationEnabled: !1,
                data: {
                    datasets: [{
                        label: "Yearly Exceedance",
                        data: n || [],
                        fill: !0,
                        backgroundColor: this.options.barColor ? this.options.barColor : "#307bda"
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0
                    },
                    scales: {
                        xAxes: [{
                            type: "time",
                            display: !0,
                            distribution: "linear",
                            time: {
                                unit: "year",
                                unitStepSize: 3,
                                max: String(parseInt(String(this.options.edate).slice(0, 4)) + 1)
                            },
                            position: "bottom"
                        }],
                        yAxes: [{
                            display: !0,
                            scaleLabel: {
                                fontSize: 10,
                                display: !0,
                                labelString: "Events per Year Above Threshold"
                            },
                            ticks: {
                                beginAtZero: !0
                            }
                        }]
                    },
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        boxWidth: 15,
                        fontSize: 10,
                        fontColor: 'black'
                      }
                    },
                    tooltips: {
                        callbacks: {
                            afterLabel: function(e, t) {
                                return 0 === e.datasetIndex ? "Invalid/missing daily values: " + _.size(_.filter(i[t.datasets[0].data[e.index].x].dailyValues, function(e) {
                                    return !1 === e.valid
                                })) : ""
                            }
                        }
                    }
                }
            })
        } else this._views.$yearlyExceedanceGraph.show()
    },
    getPercentileValue: function(e) {
        var t = _(this._dailyValues).filter(function(e) {
                return e.valid && 0 < e.value
            }).sortBy(function(e) {
                return e.value
            }).value(),
            i = t.length,
            n = void 0;
        return (e /= 100) <= 0 ? t[0].value : 1 <= e ? t[i - 1].value : (n = i * e - 1) === Math.floor(n) ? _.round((t[n].value + t[n + 1].value) / 2, 3) : (n = Math.ceil(n), _.round(t[n].value, 3))
    },
    _clearData: function() {
        this._dailyValues = null
    },
    _precip_year_validator: function(e, t, i, n, a) {
        var r = {};
        return _.forEach(t, function(e, t) {
            var i = t.substring(t.indexOf("-") + 1, t.indexOf("-") + 3);
            r.hasOwnProperty(i) || (r[i] = 0), e.valid && (r[i] = r[i] + 1)
        }), 12 === Object.keys(r).length && _.every(r, function(e, t) {
            return new Date(i, t, 0).getDate() - e <= 1
        })
    },
    _temp_year_validator: function(e, t, i, n, a) {
        var r = {};
        return _.forEach(t, function(e, t) {
            var i = t.substring(t.indexOf("-") + 1, t.indexOf("-") + 3);
            r.hasOwnProperty(i) || (r[i] = 0), e.valid && (r[i] = r[i] + 1)
        }), 12 === Object.keys(r).length && _.every(r, function(e, t) {
            return new Date(i, t, 0).getDate() - e <= 5
        })
    },
    downloadExceedanceData: function(e) {
        e.href = "data:text/csv;base64," + window.btoa("year," + this.options.variable + "\n" + this.exceedanceByYear.map(function(e) {
            return [e.x, e.y].join(",")
        }).join("\n")), e.download = [this.options.station, "yearly_exceedance", this.options.variable, this.options.threshold, this._variables[this.options.variable].queryElements[0].units].join("-").replace(/ /g, "_") + ".csv"
    }
});