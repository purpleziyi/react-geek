import * as echarts from 'echarts';
import { useEffect } from 'react';


const Home = () => {
    useEffect(() => {
        //make sure that dom is available before rendering fiagram
        // 1.获取渲染图标的dom节点
        const chartDom = document.getElementById('main');

        // 2.图标初始化生成图表实例对象
        const myChart = echarts.init(chartDom);

        // 3.准备图表参数
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        };
        // 4.使用图表参数完成图表的渲染
        option && myChart.setOption(option);


    })
    return <div><div id='main' style={{ width: '500px', height: '400px' }}></div></div>
}

export default Home