const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
// 파일업로드 라이브러리 multer
const multer  = require('multer')
const moment = require("moment");
const momentTimezome = require("moment-timezone");

const app = express();
const port = process.env.PORT || 6600;

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(session({secret : 'secret', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


// 파일업로드해서 처리할 경로 요청 
// upload.single()함수는 multer라이브러리에서 제공하는 함수
// single() <-- 안에 적을 값은 input type="file" 태그의 name값  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'))
    }
  })
  
const upload = multer({ storage: storage })



MongoClient.connect("mongodb+srv://admin:qwer1234@testdb.ur0olyk.mongodb.net/?retryWrites=true&w=majority",function(err,result){
    //에러가 발생했을경우 메세지 출력(선택사항)
    if(err) { return console.log(err); }

    //위에서 만든 db변수에 최종연결 ()안에는 mongodb atlas 사이트에서 생성한 데이터베이스 이름
    db = result.db("testdb");

    //db연결이 제대로 됬다면 서버실행
    app.listen(port,function(){
        console.log("서버연결 성공");
    });

});

//메인페이지 get 요청
app.get("/",function(req,res){
    db.collection("ex14_TESTIMONIAL").find({}).toArray(function(err,result){
        db.collection("ex14_slide").find({}).toArray(function(err,result2){
            db.collection("ex14_place").find({}).toArray(function(err,result3){
                res.render("index",{userData:req.user,testimonial:result,slide:result2,place:result3}); //로그인시 회원정보데이터 ejs 파일로 전달
            });
        });
    });
});

// 기업소개페이지 get 요청
app.get("/introduce",function(req,res){
    db.collection("ex14_turnapp").find({}).toArray(function(err,result){
        res.render("introduce",{userData:req.user,turnapp:result}); // 로그인시 회원정보데이터 ejs 파일로 전달
    });
});


//게시글 목록 get 요청
app.get("/brdlist",function(req,res){
    db.collection("ex14_board").find().toArray(function(err,result){
        res.render("brdlist",{brdData:result,userData:req.user});
    });
    //db안에 게시글 콜렉션 찾아서 데이터 전부 꺼내오고 ejs파일로 응답
});

app.get("/search",function(req,res){

    let test = [
        {
          $search: {
            index: "test2",
            text: {
              query:req.query.searchResult,
              path:req.query.searchCategory 
            }
          }
        },
        {
            $sort:{brdid:1}
        },
        {
            $limit:2
        }
      ]
      db.collection("ex14_board").aggregate(test).toArray(function(err,result){
        res.render("brdlist",{brdData:result,userData:req.user});
      });
});

//게시글 작성 페이지 get 요청
app.get("/brdinsert",function(req,res){
    //게시글 작성페이지 ejs 파일 응답
    res.render("brdinsert",{userData:req.user});
});



// 게시글 작성 후 데이터 베이스에 넣는 작업 요청

app.post("/add",upload.single('file'),function(req,res){
    // db베이스에 접근해서 게시글 입력처리
    // 게시글 목록페이지로 이동
    // moment 사용해서 현재시간 추가
    //파일 첨부 여부에 따라 변수(작명)에 들어갈 값을 대입해줌
    
    if(req.file){
        fileUpload = req.file.originalname;
    }
    else{
        fileUpload = null;
    }

    db.collection("ex14_count").findOne({name:"게시판"},function(err,result){
        db.collection("ex14_board").insertOne({
            brdid:result.totalBoard +1 ,
            brdname:req.body.name,
            brdemail:req.body.email,
            brdphone:req.body.Number,
            brdcontext:req.body.context,
            brdsubject:req.body.subject,
            brdauther:req.user.joinnick, // 로그인한 유저의 닉네임
            brdviews:0,
            brdfile:fileUpload,
            brddate:moment().tz("Asia/seoul").format("YYYY-MM-DD HH:mm:ss") //tz=timezone
            //                                        2022-10-21 10:43:20
        },function(err,result){
            db.collection("ex14_count").updateOne({name:"게시판"},{$inc:{totalBoard:1}},function(err,result){
                res.redirect("/brdlist");  // 게시글 작d성후 게시글 목록경로 요청
            })
        });
    });
});

// 게시글 상세화면 get 요청 / :변수명 작명가능
app.get("/brddetail/:no",function(req,res){  //no 작명  // 원하는 페이지만 갖고옴
    // db안에 해당 게시글번호에 맞는 데이터만 꺼내오고 ejs 파일로 응답
    db.collection("ex14_board").updateOne({brdid:Number(req.params.no)},{$inc:{brdviews:1}},function(err,result1){
        db.collection("ex14_board").findOne({brdid:Number(req.params.no)},function(err,result1){
            db.collection("ex14_comment").find({comPrd:result1.brdid}).toArray(function(err,result2){
                res.render("brddetail",{brdData:result1,userData:req.user,commentData:result2});  
            });                                //게시물                        //댓글
        });
    });
});

// 댓글 작성후 db에 추가하는 요청
app.post("/addcomment",function(req,res){
    // 몃번 댓글인지 번호부여하기 위한 작업
    db.collection("ex14_count").findOne({name:"댓글"},function(err,result1){
        // console.log(result);
        // res.send("테스트");
        // 해당 게시글의 번호값도 함께 부여
        db.collection("ex14_board").findOne({brdid:Number(req.body.prdid)},function(err,result2){ 
                                    //findOne({brdid:댓글입력시 게시글번호값})
            // console.log(result1); // ex12_count에 있는 댓글항목의 객체값
            // console.log(result2); // ex12_board에 있는 해당 게시글 번호의 제목,내용,작성자,날짜 객체값
            // res.send("테스트");

            //ex12_comment 콜렉션에 댓글넣기
            db.collection("ex14_comment").insertOne({
                comNo:result1.commentCount + 1,// comNo:댓글순번값,
                comPrd:result2.brdid,// comPrd:게시글번호값.
                comContext:req.body.comment_text,// comContext:디테일페이지에서 입력한 내용,
                comAuther:req.user.joinnick,// comAuther:로그인한 유저의 닉네임,
                comDate:moment().tz("Asia/seoul").format("YYYY-MM-DD HH:mm") // comDate:모먼트로 알아낸 한국시간
            },function(err,result){
                db.collection("ex14_count").updateOne({name:"댓글"},{$inc:{commentCount:1}},function(){
                    res.redirect("/brddetail/"+ req.body.prdid) //("/brddetail/"+ 게시글번호)
                    // 상세페이지에서 댓글입력시 보내준 게시글 번호로 -> 상세페이지 이동하도록 요청
                });
            });
        }); 
    });
});   

app.post("/updatecomment",function(req,res){ //댓글번호 해당게시글번호
    db.collection("ex14_comment").findOne({comNo:Number(req.body.comNo)},function(err,result1){
        db.collection("ex14_comment").updateOne({comNo:Number(req.body.comNo)},{$set:{comContext:req.body.comContext}},function(err,result2){
            res.redirect("/brddetail/" + result1.comPrd)
        });    
    }); 
})

// 댓글 삭제요청
// body 는 폼태그에서 받아올때
app.get("/deletecomment/:no",function(req,res){ //a태그 눌러서 보내주니간 get
    // 해당 댓글의 게시글 번호값을 찾아온후 댓글을 
    // 삭제하고 난 다음에는 해당 상세페이지로 다시 이동(게시글 번호값)
    db.collection("ex14_comment").findOne({comNo:Number(req.params.no)},function(err,result1){ //1개지우는 거라서 findOne
                                //comPrd
        // console.log(result);
        // res.send("테스트");
        db.collection("ex14_comment").deleteOne({comNo:Number(req.params.no)},function(err,result2){
            // 댓글 삭제후 findOne으로 찾아온 comPrd <--- 게시글(부모)의 번호
            res.redirect("/brddetail/" + result1.comPrd); // comPrd : 게시글 번호
        }); // result 는 객체 한덩어리 그객체덩어리중에 comPrd 만 찾아서옴  
    });  
}) 


// 게시글 수정화면 페이지 get 요청 /:변수명 작명가능
app.get("/brdupt/:no",function(req,res){
    // db안에 해당 게시글번호에 맞는 데이터를 꺼내오고 ejs파일로 응답
    // input , textarea에다가 작성내용 미리 보여줌
    db.collection("ex14_board").findOne({brdid:Number(req.params.no)},function(err,result){
        res.render("brduptview",{brdData:result,userData:req.user});
    });
});

// 수정페이지에서 입력한 데이터를 db에 수정요청
app.post("/update",upload.single('file'),function(req,res){
    // db에 해당 게시글 번호에 맞는 게시글 수정처리
    // 해당 게시글 상세화면 페이지로 이동
    if(req.file){
        fileUpload = req.file.originalname
    }
    else{
        fileUpload = req.body.fileOrigin
    }

    db.collection("ex14_board").updateOne({brdid:Number(req.body.id)},{$set:{
        brdname:req.body.name,
        brdcontext:req.body.context,
        brdnumber:req.body.Number,
        brdemail:req.body.email,
        brdsubject:req.body.subject,
        brdfile:fileUpload
    }},function(err,result){
        res.redirect("/brddetail/" + req.body.id);
    });
});

// 게시글 삭제처리 get 요청
app.get("/delete/:no",function(req,res){
    // db안에 해당 게시글 번호에 맞는 데이터만 삭제 처리
    // 게시글 목록 페이지로 이동
    db.collection("ex14_board").deleteOne({brdid:Number(req.params.no)},function(err,result){
        res.redirect("/brdlist");
    });
});

// 회원가입 페이지 get 요청
app.get("/join",function(req,res){
    res.render("join"); // 회원가입 페이지로 응답
});

// 회원가입 페이지에서 보내준 데이터를 db에 저장요청
app.post("/joindb",function(req,res){
    // 회원가입시 입력한 데이터 중에 아이디 확인 
    db.collection("ex14_join").findOne({joinid:req.body.userid,joinnick:req.body.usernick},function(err,result){ //.findOne({joinid:"내가폼태그에서 입력한 id"})
        // db 베이스에서 해당 회원아이디가 존재하는 경우
        if(result){
            res.send("<script>alert('이미 가입된 아이디 입니다'); location.href='/join';</script>") // send 문자열 string만 들어감
        }
        else {
            db.collection("ex14_count").findOne({name:"회원정보"},function(err,result){
            db.collection("ex14_join").insertOne({
                joinno:result.joinCount + 1 ,
                joinid:req.body.userid,
                joinemail:req.body.useremail,
                joinnick:req.body.usernick,
                joinphone:req.body.userphone,
                joinpass:req.body.userpass,        
                
            },function(err,result){
                db.collection("ex14_count").updateOne({name:"회원정보"},{$inc:{joinCount:1}},function(err,result){

                
                    res.send("<script>alert('회원가입성공!'); location.href='/login';</script>"); // 회원가입후 로그인 페이지 경로로 이동
                });
            });
        });
    }
});     
});

// 로그인 경로 get 요청

app.get("/login",function(req,res){
    res.render("login");
});

// 로그아웃 경로 get 요청
app.get("/logout",function(req,res){
    req.session.destroy(function(err){ // 요청 -> 세션제거
        res.clearCookie("connect.sid"); // 응답 -> 본인접속 웹브라우저 쿠키 제거
        res.redirect("/"); // 메인페이지 이동
    })
});

// 로그인 페이지에서 입력한 아이디 비밀번호 검증 처리 요청
app.post("/loginresult",passport.authenticate('local', {failureRedirect : '/fail'}),function(req,res){ // 검증
    // 실패시 / fail 경로로 요청
    res.redirect("/"); // 로그인 성공시 메인페이지로 이동
});
app.get("/fail",function(req,res){
    res.send("<script>alert('아이디 비번을 재대로 입력하세요'); location.href='/login';</script>");
});

// /loginresult 경로 요청시 passport.autenticate() 함수구간 아이디 비번 로그인 검증구간

passport.use(new LocalStrategy({
    usernameField: 'userid',
    passwordField: 'userpass',
    session: true,
    passReqToCallback: false,
  }, function (userid, userpass, done) {
    // console.log(userid, userpass);
    db.collection('ex14_join').findOne({ joinid : userid  }, function (err, result) {  // 찾아오고자 할 프로퍼티 
      if (err) return done(err)    //데이터베이스 : 내가입력한값
  
      if (!result) return done(null, false, { message: '존재하지않는 아이디 입니다.' })
      if (userpass == result.joinpass) {   // 로그인한 시점에서 내가입력한 로그인 비밀번호 == 회원가입했을때 데이터 베이스에 있는 비밀번호
        return done(null, result)
      } else {
        return done(null, false, { message: '비번이 틀렸습니다.' })
      }
    })
  }));


  // 처음 로그인 했을시 해당 사용자의 아이디를 기반으로 세션을 생성함
  // 데이터 베이스에 있는 아이디와 비번이 일치하면 
  // 세션을 생성하고 해당 아이디와 비번을 기록하여 저장하는 작업
passport.serializeUser(function (user, done) {
    // 아이디로된 세션생성
    done(null, user.joinid) // 데이터베이스에 있는 아이디가 저장되 있는 프로퍼티명 기술
                        // 서버에데가 세션만들어줘 -> 사용자 웹브라우저에서는 쿠키를 만들어줘
    // 사용자가 로그아웃시 다시 로그인할때 확인 최초의로그인한번
});

// 로그인을 한 후 다른 페이지들을 접근할 시 생성된 세션에 있는 회원정보 데이터를 보내주는 처리
// 그전에 데이터베이스에 있는 아이디와 세션에 있는 회원정보중에 아이디랑 매칭되는지 찾아주는 작업
// 만들어진 세션을 전달해서 다른페이지 에서도 해당 세션을 사용할수 있도록 처리(페이지 접근제한) 
passport.deserializeUser(function (id, done) {  // id: 작명가능 로구인중인 아이디
    // 데이터베이스에 있는 로그인 했을때 아이디만 불러와서
    // 다른페이지 에서도 세션을 사용할수 있도록 처리
    // done(null, {})
    db.collection("ex14_join").findOne({joinid:id},function(err,result){
        done(null, result); // 이동할때마다
    });
});

// 마이페이지(회원정보수정) 페이지 요청 경로
app.get("/mypage",function(req,res){
    // console.log(req.user); // 세트로 보여줌
    // res.send("테스트");
    res.render("mypage",{userData:req.user});  // userData작명
});

// 마이페이지에서 입력한 데이터를 db에 수정반영처리
app.post("/myupdate",function(req,res){
    // 회원정보(ex13_join) 콜렉션에 접근해서 해당 아이디에 맞는
    // 비번/닉네임/이메일주소/전화번호 수정한걸 변경처리 updateOne
    
    // 원래는 mypage.ejs파일에서 원래 비밀번호 입력창과 / 변경할 비밀번호 입력창
    // 조건문으로 db에 있는 비밀번호와 mypage에서 입력한 원래 비밀번호가 일치하면
    
    // db에 있는 로그인한 유저의 비빌번호  값은 findOne으로 찾아와서 
    // if(mypage에서 입력한 비번과 db에 있는 비밀번호가 똑같다면){}
    if(req.body.originpass === req.user.joinpass){  
        db.collection("ex14_join").updateOne({joinid:req.user.joinid},{$set:{
                                        // ({어떤항목을찾아서},{무엇을바꿀건지})
            
            joinnick:req.body.usernick,
            joinpass:req.body.userpass, // 마이페이지에 있는 네임
            joinphone:req.body.userphone, 
            joinemail:req.body.useremail
        }},function(err,result){
            res.send("<script>alert('회원정보 수정완료'); location.href='/';</script>");            
        });
    }
    else{
        res.send("<script>alert('원래비밀번호가 안맞음'); location.href='/mypage';</script>")
    }    
});

