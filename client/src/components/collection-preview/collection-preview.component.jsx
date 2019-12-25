import React from "react";
import { withRouter } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  TitleContainer,
  PreviewContainer
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <CollectionPreviewContainer>
    <TitleContainer onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </TitleContainer>
    <PreviewContainer>
      {items
        .filter(
          (item, index) => index < 4
        ) /*only want to show 4 items for each category on the preview page*/
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default withRouter(CollectionPreview);
