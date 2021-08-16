import { Menu } from 'antd';

const categories = ['Abstract Art', 'Realism', 'Pessimism', 'Optimism', 'Romance', 'Wealth', 'Poverty', 'Historical', 'Other'];

const MenuComponent = () => {
    const setPostCategory = (category: string) => {
        (document.getElementById('post-category') as HTMLElement).innerText = category;
    }

    return (
        <Menu>
            {categories.map(category => (
                <Menu.Item key={category} onClick={() => setPostCategory(category)}>
                    {category}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default MenuComponent;