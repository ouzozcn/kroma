import { MAIN_CONTENT_TITLE } from '../constants/text';
import ButtonContainer from './ButtonContainer';
import Header from './Header';
import styled, { css } from 'styled-components';
import ImageUpload from './ImageUpload';
import { useRef, useState, useEffect } from 'react';
import ImagePreview from './ImagePreview';
import ImageActionButtons from './ImageActionButtons';
import { useMediaQuery } from '@uidotdev/usehooks';
import { useLocation } from 'react-router-dom';

const Main = styled.main`
  flex: 1;
  background-color: var(--color-grey-50);
  ${props => !props.isSmallDevice && css`padding: 4rem 4.8rem 6.4rem;`};
`;

Main.defaultProps = {
  isSmallDevice: false
};

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;

  background-color: var(--color-grey-50);
  background-image: radial-gradient(var(--white) 2px, transparent 2px);
  background-size: 20px 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
  margin: 16px;
`;

const ContentTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: var(--black);
`;

const AppLayout = () => {
  const canvasRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  const isSmallDevice = useMediaQuery('only screen and (max-width : 832px)');
  const location = useLocation();

  // Handle image from saved images page
  useEffect(() => {
    if (location.state?.selectedImage) {
      setSelectedImage(location.state.selectedImage);
      // Clear the state to prevent reloading on subsequent navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <StyledAppLayout>
      <Header />
      <Main isSmallDevice={isSmallDevice}>
        <Container>
          <MainContent>
            <ContentTitle>{MAIN_CONTENT_TITLE}</ContentTitle>
            <ButtonContainer
              originalImage={selectedImage}
              filteredImage={filteredImage}
              setFilteredImage={setFilteredImage}
              canvasRef={canvasRef}
            />
            {selectedImage ? (
              <ImagePreview
                originalImage={selectedImage}
                filteredImage={filteredImage} 
                canvasRef={canvasRef}
              />
            ) : <ImageUpload setSelectedImage={setSelectedImage} />}
            {selectedImage && <ImageActionButtons originalImage={selectedImage} setSelectedImage={setSelectedImage} setFilteredImage={setFilteredImage} />}
          </MainContent>
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;