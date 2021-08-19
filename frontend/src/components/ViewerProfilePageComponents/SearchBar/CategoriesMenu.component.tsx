import { Menu } from 'antd';

const categories = ['All', 'Abstract Art', 'Realism', 'Pessimism', 'Optimism', 'Romance', 'Wealth', 'Poverty', 'Historical', 'Other'];

const MenuComponent = () => {
    const setCategory = (category: string) => {
        (document.getElementById('post_category') as HTMLElement).innerText = `Category: ${category}`;
    }

    return (
        <Menu>
            {categories.map(category => (
                <Menu.Item key={category} onClick={() => setCategory(category)}>
                    {category}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default MenuComponent;