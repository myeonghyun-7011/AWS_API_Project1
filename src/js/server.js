const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/metrics', (req, res) => {
  const { access_key_id, secret_access_key, region_name } = req.body;

  // 여기에서 실제 로직을 수행하고 결과를 반환합니다.
  // 예시로 응답 데이터를 고정합니다.
  const responseData = {
    message: 'Request received successfully',
    data: {
      access_key_id,
      secret_access_key,
      region_name,
    },
  };

  res.json(responseData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
