import { useContext, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ButtonGroup from './ButtonGroup';
import { useShopItemsContext } from '../../context/shopItemsContext';
import RecommendItem from './RecommendItem';

function Recommend() {
    const { shopItems } = useShopItemsContext()
    // const [items, setItems] = useState(null);

    // useEffect(() => {
    //     setItems(shopItems);
    // }, [shopItems])

    return (
        <div className="recommend">
            {shopItems && <div className="container recommend-container">
                <h3 className="recommend__title">YOU MAY ALSO LIKE</h3>
                <div className="recommend-items">
                    <div className="recommend-items__container">
                        <Carousel responsive={responsive} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup />} arrows={false} swipeable={true} draggable={false}>
                            {shopItems.map(item => <RecommendItem item={item} key={item.id} />)}
                        </Carousel>
                    </div>
                </div>
            </div>}
        </div>
    );
}

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 4
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 768, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default Recommend;