module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: "javascript/auto",       // Webpack이 .mjs 파일을 일반 JS로 처리하도록 설정
            test: /\.mjs$/,                // .mjs 확장자 파일 대상
            include: /node_modules/,       // node_modules 내부 파일만 적용
          },
        ],
      },
    },
  },
};
