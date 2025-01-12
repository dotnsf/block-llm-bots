//. app.js
var express = require( 'express' ),
    app = express();

app.use( express.Router() );

//. LLM クローラーボットブロックを有効にする
app.use( require( './block_llm_bots' ) );

//. .env 内に記載された UserAgent からのリクエストだとこの処理は実行されない
app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  res.write( JSON.stringify( { status: true }, null, 2 ) );
  res.end();
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );

