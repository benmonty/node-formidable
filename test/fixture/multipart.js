var multipartBodyMix = 'preamble\r\n--boundary\r\ncontent-type: image/jpeg\r\nobject-id: 5\r\ncontent-id: 1\r\n\r\n' +
                        'body0\r\n--boundary\r\ncontent-type: text/xml\r\nobject-id: 3\r\ncontent-id: 2\r\n\r\n' +
                        'body1\r\n--boundary\r\ncontent-type: image/jpeg\r\nobject-id: 0\r\ncontent-id: 7\r\n\r\n' +
                        'body2\r\n--boundary\r\ncontent-type: text/xml\r\nobject-id: lol\r\ncontent-id: lulz\r\n\r\n' +
                        'body3\r\n--boundary--\r\n';

exports['preamble0'] = {
  boundary: 'boundary',
  raw: multipartBodyMix,
  parts: [
    {
      headers: {
        'content-type': 'image/jpeg',
        'object-id': '5',
        'content-id': '1'
      },
      data: 'body0'
    },
    {
      headers: {
        'content-type': 'text/xml',
        'object-id': '3',
        'content-id': '2'
      },
      data: 'body1'
    },
    {
      headers: {
        'content-type': 'image/jpeg',
        'object-id': '0',
        'content-id': '7'
      },
      data: 'body2'
    },
    {
      headers: {
        'content-type': 'text/xml',
        'object-id': 'lol',
        'content-id': 'lulz'
      },
      data: 'body3'
    }
  ]
};
exports['preamble1'] = {
  boundary: 'lulz',
  raw:
    'this is a preamble \r\nthis is a preamble this is\r\n a preamble this is a preamble\r\n' +
    '--lulz\r\n' +
    'Content-Type: text/xml\r\n\r\n' +
    'this is body1\r\n' +
    '--lulz\r\n' +
    'Content-Type: image/jpeg\r\n\r\n' +
    'body2\r\n' +
    '--lulz--',
  parts: [ 
        {
          headers: {
            'Content-Type': 'text/xml'
          },
          data: 'this is body1'
        },
        {
          headers: {
            'Content-Type': 'image/jpeg'
          },
          data: 'body2'
        }
    ]
};

exports['preamble2'] = {
  boundary: 'zzzzzzzzzz',
  raw:
    '\r\n' +
    '--zzzzzzzzzz\r\n' +
    'Content-Type: text/xml\r\n\r\n' +
    'this is body1\r\n' +
    '--zzzzzzzzzz\r\n' +
    'Content-Type: image/jpeg\r\n\r\n' +
    'body2\r\n' +
    '--zzzzzzzzzz--',
  parts: [ 
        {
          headers: {
            'Content-Type': 'text/xml'
          },
          data: 'this is body1'
        },
        {
          headers: {
            'Content-Type': 'image/jpeg'
          },
          data: 'body2'
        }
    ]
};

exports['rfc1867'] =
  { boundary: 'AaB03x',
    raw:
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="field1"\r\n'+
      '\r\n'+
      'Joe Blow\r\nalmost tricked you!\r\n'+
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="pics"; filename="file1.txt"\r\n'+
      'Content-Type: text/plain\r\n'+
      '\r\n'+
      '... contents of file1.txt ...\r\r\n'+
      '--AaB03x--\r\n',
    parts:
    [ { headers: {
          'content-disposition': 'form-data; name="field1"',
        },
        data: 'Joe Blow\r\nalmost tricked you!',
      },
      { headers: {
          'content-disposition': 'form-data; name="pics"; filename="file1.txt"',
          'Content-Type': 'text/plain',
        },
        data: '... contents of file1.txt ...\r',
      }
    ]
  };

exports['noTrailing\r\n'] =
  { boundary: 'AaB03x',
    raw:
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="field1"\r\n'+
      '\r\n'+
      'Joe Blow\r\nalmost tricked you!\r\n'+
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="pics"; filename="file1.txt"\r\n'+
      'Content-Type: text/plain\r\n'+
      '\r\n'+
      '... contents of file1.txt ...\r\r\n'+
      '--AaB03x--',
    parts:
    [ { headers: {
          'content-disposition': 'form-data; name="field1"',
        },
        data: 'Joe Blow\r\nalmost tricked you!',
      },
      { headers: {
          'content-disposition': 'form-data; name="pics"; filename="file1.txt"',
          'Content-Type': 'text/plain',
        },
        data: '... contents of file1.txt ...\r',
      }
    ]
  };

exports['emptyHeader'] =
  { boundary: 'AaB03x',
    raw:
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="field1"\r\n'+
      ': foo\r\n'+
      '\r\n'+
      'Joe Blow\r\nalmost tricked you!\r\n'+
      '--AaB03x\r\n'+
      'content-disposition: form-data; name="pics"; filename="file1.txt"\r\n'+
      'Content-Type: text/plain\r\n'+
      '\r\n'+
      '... contents of file1.txt ...\r\r\n'+
      '--AaB03x--\r\n',
    expectError: true,
  };
