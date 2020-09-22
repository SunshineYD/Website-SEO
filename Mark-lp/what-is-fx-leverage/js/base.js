$(function() {
    var onelink = sessionStorage.getItem('onelink')
    var lang = sessionStorage.getItem('lang')
        //	console.log(onelink)
        //BOSS埋点
        //utm_source：☆☆☆ 广告来源 如baidu_ios baidu_pc baidu_3g 区别不同的账户使用
        //utm_medium： 广告媒介、 渠道 如baidu 360 投放的这个媒体， 大类型
        //utm_campaign： 广告名称 如pc app 投放的设备或者投放的端口
        //utm_content： 广告内容 如 投放的关键词
        //utm_term： 广告的关键词 如 这个可以加个日期、 投放人简称之类的。(事件监控时此字段作为buttonId上报)
        //iid： 推广的ID 如 多系统间沟通。 或者扩展词用
        //gclid: googleAds携带 （并不属于boss追踪维度）推广要求全程跟踪
    var lpJson = {
        lpUrl: window.location.href,
        lpReferer: document.referrer,
        utm_source: getQueryString('utm_source') == null ?
            '' : getQueryString('utm_source'),
        utm_medium: getQueryString('utm_medium') == null ?
            '' : getQueryString('utm_medium'),
        utm_campaign: getQueryString('utm_campaign') == null ?
            '' : getQueryString('utm_campaign'),
        utm_content: getQueryString('utm_content') == null ?
            '' : getQueryString('utm_content'),
        utm_term: getQueryString('utm_term') == null ?
            '' : getQueryString('utm_term'),
        iid: getQueryString('iid') == null ? '' : getQueryString('iid'),
        gclid: getQueryString('gclid') == null ? '' : getQueryString('gclid'),
    }

    var countryCode = {
        '886': 'TW',
        '84': 'VN',
        '66': 'TH',
        '82': 'KR',
        '63': 'PH',
        '60': 'MY',
        '852': 'HK',
        '86': 'CN',
        '61': 'AU',
    }

    toHref()
        //logo跳转
        //toOfficial();
    loadAndGenSign()

    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        var r = window.location.search.substr(1).match(reg)
        if (r != null) {
            return unescape(r[2])
        }
        return null
    }
    //页面渲染tracking
    function loadAndGenSign() {
        $.ajax({
            type: 'get',
            async: true,
            url: 'https://myad.mitrade.com/beacons/load?loadurl=' +
                encodeURIComponent(lpJson.lpUrl) +
                '&clientReferer=' +
                encodeURIComponent(lpJson.lpReferer),
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            success: function(data) {
                console.log('页面渲染完成')
            },
        })
    }

    // 按钮事件，链接事件相关
    function action(buttonId) {
        //将url中的某个关键词修改为buttonId上报boss
        var url =
            lpJson.lpUrl.split('?')[0] +
            '?' +
            'utm_source=' +
            lpJson.utm_source +
            '&utm_medium=' +
            lpJson.utm_medium +
            '&utm_campaign=' +
            lpJson.utm_campaign +
            '&utm_content=' +
            lpJson.utm_content +
            '&utm_term=' +
            buttonId +
            '&iid=' +
            lpJson.iid +
            '&gclid=' +
            lpJson.gclid
        $.ajax({
            type: 'get',
            async: true,
            url: 'https://myad.mitrade.com/beacons/load?loadurl=' +
                encodeURIComponent(url) +
                '&clientReferer=' +
                encodeURIComponent(lpJson.lpReferer),
            dataType: 'jsonp',
            jsonp: 'jsonpCallback',
            success: function(data) {
                console.log('页面跳转中')
            },
        })
    }
    var resTips = {
        cn: {
            t1: '请输入邮箱',
            t2: '邮箱格式错误',
            t3: '请输入密码',
            t4: '格式不正确',
            t6: '注册成功，正在跳转',
            t7: '您的电子邮箱已注册账户，请登录。',
            t8: '帐户存在',
            t9: '输入手机号码',
            t10: '电话号码无效',
            t11: '输入验证码',
            t12: '输入密码 ',
            t13: '您的电话号码已被注册',
            t14: '验证码无效',
            t15: '发送失败',
            t16: '获取验证码',
        },
        zh: {
            t1: '請輸入郵箱',
            t2: '郵箱格式錯誤',
            t3: '請輸入密碼',
            t4: '格式不正確',
            t6: '註冊成功！正在跳轉...',
            t7: '您的電子郵箱已註冊賬戶，請登錄。',
            t8: '賬戶存在',
            t9: '輸入手機號碼',
            t10: '電話號碼無效',
            t11: '輸入驗證碼',
            t12: '輸入密碼',
            t13: '您的電話號碼已被註冊',
            t14: '驗證碼無效',
            t15: '發送失敗',
            t16: '獲取驗證碼',
        },
        en: {
            t1: 'Email',
            t2: 'Please fill in a correct E-mail',
            t3: 'Please input password',
            t4: 'Incorrect format',
            t6: 'Registration is successful. Transferring in progress.',
            t7: 'Your email address is registered. Please login.',
            t8: 'account exist',
            t9: 'Phone Number',
            t10: 'Invalid phone number',
            t11: 'Verification code',
            t12: 'Password',
            t13: 'Your phone number has been registered',
            t14: 'invalid verification code',
            t15: 'send failed',
            t16: 'get code',
            t17: '8-16 English characters and numbers',
        },
        th: {
            t1: 'อีเมล',
            t2: 'กรุณากรอกอีเมลที่ถูกต้อง',
            t3: 'กรุณาป้อนรหัสผ่าน',
            t4: 'รูปแบบไม่ถูกต้อง',
            t6: 'Đăng ký thành công. Đang chuyển',
            t7: 'อีเมล์ของท่านได้ถูกลงทะเบียนแล้ว กรุณาเข้าสู่ระบบ',
            t8: 'การลงทะเบียนสำเร็จ กำลังดำเนินการโอน',
            t9: 'เบอร์โทรศัพท์',
            t10: 'ท่านมีบัญชีเทรดแล้ว',
            t11: 'รหัสยืนยัน',
            t12: 'รหัสผ่าน',
            t13: 'หมายเลขโทรศัพท์ของท่านได้รับการลงทะเบียนแล้ว',
            t14: 'รหัสยืนยันไม่ถูกต้อง',
            t15: 'การส่งล้มเหลว',
            t16: 'รับรหัส',
        },
        vn: {
            t1: 'Email',
            t2: 'Vui lòng nhập đúng E-mail',
            t3: 'Vui lòng nhập mật khẩu',
            t4: 'Định dạng không chính xác',
            t6: 'Đăng ký thành công. Đang chuyển',
            t7: 'Địa chỉ email của bạn đã được đăng ký. Xin vui lòng đăng nhập.',
            t8: 'Tài khoản này đã tồn tại',
            t9: 'Số điện thoại',
            t10: 'Số điện thoại không hợp lệ',
            t11: 'Mã xác nhận',
            t12: 'Mật khẩu',
            t13: 'Số điện thoại của bạn đã được đăng ký',
            t14: 'Mã xác minh không hợp lệ',
            t15: 'gửi thất bại',
            t16: 'Nhận mã',
            t17: '8-16 ký tự bao gồm tiếng Anh và số',
        },
        kr: {
            t1: '이메일',
            t2: '올바른 이메일을 입력해 주십시오',
            t3: '비밀번호를 입력해주세요',
            t4: '잘못된 형식입니다',
            t6: '등록에 성공했습니다. 전송 중입니다.',
            t7: '이메일 주소가 등록되었습니다. 로그인 해주시기 바랍니다.',
            t8: '이미 존재한 계정입니다',
            t9: '휴대폰 번호',
            t10: '잘못된 전화 번호입니다',
            t11: '인증 코드',
            t12: '비밀번호',
            t13: '전화 번호가 이미 등록되었습니다.',
            t14: '잘못된 인증 코드입니다.',
            t15: '발송 실패',
            t16: '코드 얻기',
        },
    }

    //pc端菜单操作
    $('.header .select-icon').mouseover(function() {
        $(this).removeClass('select-down')
        $(this).addClass('select-up')
        $(this).siblings('.collapse-nav').show()
    })
    $('.header .select-icon').mouseleave(function() {
        $(this).removeClass('select-up')
        $(this).addClass('select-down')
        $(this).siblings('.collapse-nav').hide()
    })
    $('.header .collapse-nav').mouseover(function() {
        $(this).show()
    })
    $('.header .collapse-nav').mouseleave(function() {
        $(this).hide()
    })

    /* $('.head-link').on('click', function() {
            $('.navbar .navbar-toggler').click()
            var linkUrl = $(this).attr('data')
            window.location.href =
                linkUrl +
                '?utm_source=' +
                lpJson.utm_source +
                '&utm_medium=' +
                lpJson.utm_medium +
                '&utm_campaign=' +
                lpJson.utm_campaign +
                '&utm_content=' +
                lpJson.utm_content +
                '&utm_term=' +
                lpJson.utm_term +
                '&iid=' +
                lpJson.iid +
                '&gclid=' +
                lpJson.gclid
        }) */
        //移动端菜单按钮点击
    $('.navbar .navbar-toggler').on('click', function() {
        if ($(this).attr('aria-expanded') == 'false') {
            $('body').css('overflow', 'hidden')
        } else {
            $('body').css('overflow', 'inherit')
        }
    })

    //已有账户登录
    $('.account-href').on('click', function() {
        window.location.href = onelink
        // if (IsPC()) {
        //     var searchUrl =
        //         '?utm_source=' +
        //         lpJson.utm_source +
        //         '&utm_medium=' +
        //         lpJson.utm_medium +
        //         '&utm_campaign=' +
        //         lpJson.utm_campaign +
        //         '&utm_content=' +
        //         lpJson.utm_content +
        //         '&utm_term=' +
        //         lpJson.utm_term +
        //         '&iid=' +
        //         lpJson.iid +
        //         '&gclid=' +
        //         lpJson.gclid
        //     window.location.href = 'https://app.mitrade.com' + searchUrl
        // } else if (isAndroid()) {
        //     window.location.href = onelink
        // } else if (isIOS()) {
        //     window.location.href = onelink
        // }
    })

    // 注册验证
    var valid = {
        inp1: function inp1(str) {
            var reg = /(?=.*[0-9])(?=.*[a-zA-Z])(.{8,16})$/
            return reg.test(str)
        },
        inp2: function inp2(str) {
            //国内邮箱验证
            // var reg = /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/;
            //国际邮箱验证
            var reg = /[^ `~!@#$%\^&\*\(\)\+=\|\{\}\':;\',\\\[\]<>\/\?~！@#￥%……&\*（）——+\|\{\}【】‘；：”“’。，、？\s]{1,}@[^`~!@#$ %\^&\*\(\) \+=\|\{ \ } \':;\',\\\[\]\.<>\/\?~！@#￥%……&\*（）——+\|\{\}【】‘；：”“’。，、？\s]{1,}\.[^`~!@#$%\^&\*\(\)\+=\|\{\}\':;\',\\\[\]<>\/\?~！@#￥%……&\*（）——+\|\{\}【】‘；：”“’。，、？\s]{1,}/
            return reg.test(str)
        },
        inp3: function inp3(str) {
            var countryCallingCode = $('#areaVal').text().slice(1)
            var areaCode = countryCode[countryCallingCode]
                //console.log(areaCode);
            if (str == '') {
                return false
            } else {
                var phoneNumber = new libphonenumber.parsePhoneNumberFromString(
                    str,
                    areaCode
                )
                return phoneNumber.isValid()
            }
        },
    }

    // google 三方登录
    $('.ge').on('click', function() {
        action('google-oauth-signin')
    })

    var googleUser = {}
    var startApp = function() {
        gapi.load('auth2', function() {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            auth2 = gapi.auth2.init({
                client_id: '911514836004-ea1llbh6djtjbgnq3alj0ljd02234c5o.apps.googleusercontent.com', //客户端ID
                //			cookiepolicy: 'single_host_origin',
                //			scope: 'profile' //可以请求除了默认的'profile' and 'email'之外的数据
            })
            attachSignin(document.getElementById('gaSignIn'))
                //手机注册
            attachSignin(document.getElementById('gaSignPhone'))
        })
    }

    function attachSignin(element) {
        auth2.attachClickHandler(
            element, {},
            function(googleUser) {
                var id_token = googleUser.getAuthResponse().id_token
                oauthSignGE({
                    platform: 'google',
                    idToken: id_token,
                    source: 'pc',
                    rememberMe: true,
                    baseCurrencyCode: 'USD',
                })
            },
            function(error) {
                console.log(JSON.stringify(error, undefined, 2))
            }
        )
    }
    startApp()

    function oauthSignGE(param) {
        $.ajax({
            type: 'post',
            url: 'https://app.mitrade.com/api/v1/customers/oauth-signin',
            headers: {
                Locale: 'en',
            },
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            data: param,
            async: true,
            success: function(res, textStatus, request) {
                if (res.success) {
                    if (res.isNew) {
                        dataLayer.push({
                            event: 'google-oauth-new-lpSign',
                        })
                        $('.vaild-tips').html(resTips[lang].t6)
                    } else {
                        dataLayer.push({
                            event: 'google-oauth-old-lpSign',
                        })
                        $('.vaild-tips').html(resTips[lang].t6)
                    }
                    dataLayer.push({
                        event: 'AllEvents_FinishSignUp',
                    })
                    var tokenid = request.getResponseHeader('Session-Token')
                    setTimeout(function() {
                        if (IsPC()) {
                            window.location.href =
                                'https://app.mitrade.com/?session-token=' +
                                tokenid +
                                '&utm_source=' +
                                lpJson.utm_source +
                                '&utm_medium=' +
                                lpJson.utm_medium +
                                '&utm_campaign=' +
                                lpJson.utm_campaign +
                                '&utm_content=' +
                                lpJson.utm_content +
                                '&utm_term=' +
                                lpJson.utm_term +
                                '&iid=' +
                                lpJson.iid +
                                '&gclid=' +
                                lpJson.gclid
                        } else {
                            window.location.href = onelink
                        }
                    }, 1000)
                }
            },
        })
    }
    //facebook 三方登录
    window.fbAsyncInit = function() {
        FB.init({
            appId: '623247434776745',
            cookie: true,
            xfbml: true,
            version: 'v4.0',
        })
        FB.AppEvents.logPageView()
    }

    ;
    (function(d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) {
            return
        }
        js = d.createElement(s)
        js.id = id
        js.src = 'https://connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response)
        })
    }

    $('.fb').on('click', function() {
        action('facebook-oauth-signin')
        FB.login(function(response) {
            if (response.status === 'connected') {
                oauthSignFB({
                    platform: 'facebook',
                    idToken: response.authResponse.accessToken,
                    source: 'pc',
                    rememberMe: true,
                    baseCurrencyCode: 'USD',
                })
            }
        })
    })

    function oauthSignFB(param) {
        $.ajax({
            type: 'post',
            url: 'https://app.mitrade.com/api/v1/customers/oauth-signin',
            headers: {
                Locale: 'en',
            },
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            data: param,
            async: true,
            success: function(res, textStatus, request) {
                if (res.success) {
                    if (res.isNew) {
                        dataLayer.push({
                            event: 'facebook-oauth-new-lpSign',
                        })
                        $('.vaild-tips').html(resTips[lang].t6)
                    } else {
                        dataLayer.push({
                            event: 'facebook-oauth-old-lpSign',
                        })
                        $('.vaild-tips').html(resTips[lang].t6)
                    }
                    dataLayer.push({
                        event: 'AllEvents_FinishSignUp',
                    })
                    var tokenid = request.getResponseHeader('Session-Token')

                    setTimeout(function() {
                        if (IsPC()) {
                            window.location.href =
                                'https://app.mitrade.com/?session-token=' +
                                tokenid +
                                '&utm_source=' +
                                lpJson.utm_source +
                                '&utm_medium=' +
                                lpJson.utm_medium +
                                '&utm_campaign=' +
                                lpJson.utm_campaign +
                                '&utm_content=' +
                                lpJson.utm_content +
                                '&utm_term=' +
                                lpJson.utm_term +
                                '&iid=' +
                                lpJson.iid +
                                '&gclid=' +
                                lpJson.gclid
                        } else {
                            window.location.href = onelink
                        }
                    }, 1000)
                }
            },
        })
    }
    //logo跳转
    function toOfficial() {
        var searchUrl =
            '?utm_source=' +
            lpJson.utm_source +
            '&utm_medium=' +
            lpJson.utm_medium +
            '&utm_campaign=' +
            lpJson.utm_campaign +
            '&utm_content=' +
            lpJson.utm_content +
            '&utm_term=' +
            lpJson.utm_term +
            '&iid=' +
            lpJson.iid +
            '&gclid=' +
            lpJson.gclid
        $('.logoTrack').attr('href', 'https://www.mitrade.com/' + searchUrl)
    }

    function toHref() {
        $('.trackBtn').attr('href', onelink)
        // if (IsPC()) {
        //     var searchUrl =
        //         '?utm_source=' +
        //         lpJson.utm_source +
        //         '&utm_medium=' +
        //         lpJson.utm_medium +
        //         '&utm_campaign=' +
        //         lpJson.utm_campaign +
        //         '&utm_content=' +
        //         lpJson.utm_content +
        //         '&utm_term=' +
        //         lpJson.utm_term +
        //         '&iid=' +
        //         lpJson.iid +
        //         '&gclid=' +
        //         lpJson.gclid
        //     $('.trackBtn').attr('href', 'https://app.mitrade.com/' + searchUrl)
        // } else if (isAndroid()) {
        //     $('.trackBtn').attr('href', onelink)
        // } else if (isIOS()) {
        //     $('.trackBtn').attr('href', onelink)
        // }
    }

    function isAndroid() {
        return navigator.userAgent.match(/Android/i) ? true : false
    }

    function isIOS() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false
    }

    function IsPC() {
        var userAgentInfo = navigator.userAgent
        var Agents = [
            'Android',
            'iPhone',
            'SymbianOS',
            'Windows Phone',
            'iPad',
            'iPod',
        ]
        var flag = true
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false
                break
            }
        }
        return flag
    }

    //获取国家信息
    ;
    /* (function getCountries() {
        $.ajax({
            type: 'get',
            async: true,
            url: 'https://app.mitrade.com/api/v1/cms/countries',
            headers: {
                Locale: 'zh-CN',
            },
            success: function(res, textStatus, request) {
                if (res.success) {
                    for (let i = 0; i < res.value.length; i++) {
                        const element = res.value[i]
                        console.log(element.isDefault)
                        if (element.isDefault === true) {
                            //console.log(element.countryCode);
                            $('#areaVal').text('+' + element.dialingCode)
                        }
                    }
                }
            },
        })
    })() */

    //电话号码国家区号下拉选择
    var areaVal = document.getElementById('areaVal')
    var selectUl = document.getElementById('phnoneNum')
    var selectLis = selectUl.getElementsByTagName('a')
    for (var i = 0; i < selectLis.length; i++) {
        selectLis[i].onclick = function() {
            //这里没有阻止冒泡，是为了使用document.onclick逻辑
            areaVal.innerHTML = this.getAttribute('data-area')
        }
    }

    //发送验证码倒计时
    var flag = false
    $('#sendCode').on('click', function() {
        if (flag === true) {
            return false
        }
        getCode()
    })

    //获取手机验证码
    function getCode() {
        console.log($('#areaVal').text().slice(1))
            // 手机号码不为空判断
        if (!valid.inp3($('#inputNumber4').val())) {
            if ($('#inputNumber4').val() == '') {
                $('#section38 .vaild-tips').html(resTips[lang].t9)
                return
            } else {
                $('#section38 .vaild-tips').html(resTips[lang].t10)
                return
            }
        }
        $.ajax({
            type: 'post',
            url: 'https://app.mitrade.com/api/v1/misc/verification-codes',
            headers: {
                Locale: 'en-US',
            },
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            data: {
                method: 'SMS',
                countryCallingCode: $('#areaVal').text().slice(1),
                phoneNumber: $('#inputNumber4').val(),
                purpose: 'REGISTER',
            },
            async: true,
            success: function(res, textStatus, request) {
                if (res.success) {
                    flag = true
                    $('#sendCode').css("color", "#999999");
                    var n = 0
                    var time
                    var id = setInterval(function() {
                        n += 1
                        if (n < 60) {
                            time = 60 - n
                            $('#sendCode').text(time + 's')
                        } else {
                            $('#sendCode').text(resTips[lang].t16)
                            clearInterval(id)
                            $('#sendCode').css("color", "#007bff");
                            flag = false
                        }
                    }, 1000)
                } else {
                    if (res.errCode == '10004') {
                        dataLayer.push({
                            event: 'registBtn-old-lpSign',
                        })
                        dataLayer.push({
                            event: 'AllEvents_FinishSignUp',
                        })
                        $('#section38 .vaild-tips').html(resTips[lang].t8)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#section38 .vaild-tips').html(resTips[lang].t15)
            },
        })
    }

    $('#phnoneRegistBtn').on('click', function() {
        action('registBtn')

        if (!valid.inp3($('#inputNumber4').val())) {
            if ($('#inputNumber4').val() == '') {
                $('#section38 .vaild-tips').html(resTips[lang].t9)
            } else {
                $('#section38 .vaild-tips').html(resTips[lang].t10)
            }
        } else if ($('#inputCode').val() == '') {
            $('#section38 .vaild-tips').html(resTips[lang].t11)
        } else if (!valid.inp1($('#inputPassword4').val())) {
            if ($('#inputPassword4').val() == '') {
                $('#section38  .vaild-tips').html(resTips[lang].t12)
            } else {
                $('#section38 .vaild-tips').html(resTips[lang].t4)
            }
        } else {
            phoneSignup()
        }
    })

    // 电话号码注册
    function phoneSignup() {
        $.ajax({
            type: 'post',
            url: 'https://app.mitrade.com/api/v1/customers/signup',
            headers: {
                Locale: 'en',
            },
            xhrFields: {
                withCredentials: true,
            },
            crossDomain: true,
            data: {
                countryCallingCode: $('#areaVal').text().slice(1),
                mobileNumber: $('#inputNumber4').val(),
                smsCode: $('#inputCode').val(),
                password: $('#inputPassword4').val(),
                baseCurrencyCode: 'USD',
            },
            async: true,
            success: function(res, textStatus, request) {
                if (res.success) {
                    dataLayer.push({
                        event: 'registBtn-new-lpSign',
                    })
                    dataLayer.push({
                        event: 'AllEvents_FinishSignUp',
                    })
                    var tokenid = request.getResponseHeader('Session-Token')
                    setTimeout(function() {
                        if (IsPC()) {
                            window.location.href =
                                'https://app.mitrade.com/?session-token=' +
                                tokenid +
                                '&utm_source=' +
                                lpJson.utm_source +
                                '&utm_medium=' +
                                lpJson.utm_medium +
                                '&utm_campaign=' +
                                lpJson.utm_campaign +
                                '&utm_content=' +
                                lpJson.utm_content +
                                '&utm_term=' +
                                lpJson.utm_term +
                                '&iid=' +
                                lpJson.iid +
                                '&gclid=' +
                                lpJson.gclid
                        } else {
                            window.location.href = onelink
                        }
                    }, 1000)
                } else {
                    if (res.errCode == '10004') {
                        dataLayer.push({
                            event: 'registBtn-old-lpSign',
                        })
                        dataLayer.push({
                            event: 'AllEvents_FinishSignUp',
                        })
                        $('#section38 .vaild-tips').html(resTips[lang].t13)
                    }
                    if (res.errCode == '10014') {
                        $('#section38 .vaild-tips').html(resTips[lang].t14)
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $('#section38 .vaild-tips').html(resTips[lang].t15)
            },
        })
    }

    var topH = IsPC() ? $('.header').height() : $('.mobile-navbar').height();
    $(window).scroll(function() {
        var scrolH = $(this).scrollTop();

        if (scrolH > topH) {

            if (IsPC()) {

                $('.header').addClass('header-fixed');
            } else {
                $('.mobile-navbar').addClass('header-fixed');
            }
        } else {

            if (IsPC()) {

                $('.header').removeClass('header-fixed');
            } else {
                $('.mobile-navbar').removeClass('header-fixed');
            }
        }
    })
})