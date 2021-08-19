import { Menu } from 'antd';

const filterOptions = ['Date', 'Likes'];

const SortByMenu = () => {
    const setFilter = (filter: string) => {
        (document.getElementById('filter_option') as HTMLElement).innerText = `Sorted by: ${filter}`;
    }

    return (
        <Menu>
            {filterOptions.map(filterOption => (
                <Menu.Item key={filterOption} onClick={() => setFilter(filterOption)}>
                    {filterOption}
                </Menu.Item>
            ))}
        </Menu>
    )
}

export default SortByMenu;
