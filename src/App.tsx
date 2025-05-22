import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  width: 1000px;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
`;

const Box = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  cursor: pointer;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: tomato;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnlargedBox = styled(motion.div)`
  width: 500px;
  height: 300px;
  border-radius: 30px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  border-radius: 15px;
  border: none;
  background-color: #ff6b6b;
  color: white;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 4px 10px rgba(255, 107, 107, 0.5);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff4c4c;
  }
`;

const getOrigin = (index: number) => {
  switch (index) {
    case 0: return "top left";
    case 1: return "top right";
    case 2: return "bottom left";
    case 3: return "bottom right";
    default: return "center";
  }
};

const getHoverEffect = (index: number) => {
  const scale = 1.08;
  const shift = 12;
  switch (index) {
    case 0: return { scale, x: -shift, y: -shift, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" };
    case 1: return { scale, x: shift, y: -shift, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" };
    case 2: return { scale, x: -shift, y: shift, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" };
    case 3: return { scale, x: shift, y: shift, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" };
    default: return {};
  }
};

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [circleIn, setCircleIn] = useState(Math.floor(Math.random() * 4));

  const switchCircle = () => {
    let next;
    do {
      next = Math.floor(Math.random() * 4);
    } while (next === circleIn);
    setCircleIn(next);
  };

  return (
    <Container>
      <Grid>
        {[0, 1, 2, 3].map((i) => (
          <Box
            key={i}
            layoutId={`box-${i}`}
            onClick={() => setSelectedId(i)}
            whileHover={getHoverEffect(i)}
            style={{ transformOrigin: getOrigin(i) }}
          >
            {circleIn === i && <Circle layoutId="circle" />}
          </Box>
        ))}
      </Grid>
      <Button onClick={switchCircle}>Random</Button>
      <AnimatePresence>
        {selectedId !== null && (
          <Overlay
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EnlargedBox layoutId={`box-${selectedId}`}>
              {circleIn === selectedId && <Circle layoutId="circle" />}
            </EnlargedBox>
          </Overlay>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default App;
