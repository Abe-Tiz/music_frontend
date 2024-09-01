import React from 'react';
import AlbumList from './AlbumList';
import { Global,css } from '@emotion/react';
import { BackLink, StatContainer } from '../../styles/Statistics';
import { StatHeader, StatText } from '../../styles/BarGraph';
import BarGraph from './BarGraph';

const Index: React.FC = () => {
    return (
      <>
        <Global
          styles={css`
            body {
              margin: 0;
              background-color: rgb(252, 251, 253);
            }
          `}
        />
        <StatHeader>
          <BackLink to="/">Back</BackLink>
          <StatText></StatText>
        </StatHeader>
        <StatContainer>
          <BarGraph />
          <AlbumList />
        </StatContainer>
      </>
    );
}

export default Index
