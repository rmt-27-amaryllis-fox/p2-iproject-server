const router = require('express').Router();
const Controller = require('../controllers');
const cors = require('cors');

router.use(cors());

router.get('/login', cors(), Controller.login);
router.get('/callback', Controller.callback);
router.get('/refresh_token', Controller.refreshToken);
router.get('/users', Controller.user);
router.get('/songs/newrelease', Controller.browseNewReleases);
router.get('/albums/search', Controller.search);
router.get('/artists/search', Controller.searchSimilar);
router.get('/lyrics/search', Controller.searchLyrics);
router.get('/playlists/:id', Controller.fetchPlaylist);
router.post('/playlists/:id', Controller.createPlaylist);

module.exports = router;