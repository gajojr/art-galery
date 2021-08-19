import { Dropdown, Button } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

import MenuComponent from './CategoriesMenu.component';
import SortByMenu from './SortByMenu.component';

const SearchBar = () => {
    return (
        <nav>
            <Dropdown overlay={MenuComponent()} trigger={['click']} arrow>
                <Button id='post_category'>Category: All<CaretDownOutlined /></Button>
            </Dropdown>

            <Dropdown overlay={SortByMenu()} trigger={['click']} arrow>
                <Button id='filter_option'>Sort By: Date<CaretDownOutlined /></Button>
            </Dropdown>
        </nav>
    )
}

export default SearchBar;
