import Head from 'next/head'
import Link from 'next/link'
import MerisEnzoLayout from '../components/pedals/meris_enzo/layout'
import MerisHedraLayout from '../components/pedals/meris_hedra/layout'
import MerisPolymoonLayout from '../components/pedals/meris_polymoon/layout'
import MerisOttobitJrLayout from '../components/pedals/meris_ottobit_jr/layout'
import MerisMercury7Layout from '../components/pedals/meris_mercury7/layout'
import PresetsModal from '../components/presets_modal'
import useLocalStorage from '../hooks/use_local_storage'
import {MidiConfigContext} from '../hooks/midi_config'
import Expression from '../components/expression'
import {useState, useContext, useEffect} from 'react'

export default function Home(props) {
  const [selectedPedal, setSelectedPedal] = useLocalStorage('selected_pedal', 'enzo')
  const [expressionVal, setExpressionVal] = useState(0);
  const [pedalSelectAndOrder, setPedalSelectAndOrder] = useLocalStorage('pedals_to_select',[
    {key: 'enzo', label: 'Enzo', order: 1, iconSource: './enzo_button.svg'},
    {key: 'hedra', label: 'Hedra', order: 2, iconSource: './hedra_button.svg'},
    {key: 'polymoon', label: 'Polymoon', order: 3, iconSource: './polymoon_button.svg'},
    {key: 'mercury7', label: 'Mercury7', order: 4, iconSource: './mercury7_button.svg'},
    {key: 'ottobitJr', label: 'Ottobit Jr.', order: 5, iconSource: './ottobit_jr_button.svg'}
  ]);
  const [dragId, setDragId] = useState();
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };
  const handleDrop = (ev) => {
    const dragBox = pedalSelectAndOrder.find((pedal) => pedal.key === dragId);
    const dropBox = pedalSelectAndOrder.find((pedal) => pedal.key === ev.currentTarget.id);

    const dragBoxOrder = dragBox.order;
    const dropBoxOrder = dropBox.order;

    const newPedalOrder = pedalSelectAndOrder.map((pedal) => {
      if (pedal.key === dragId) {
        pedal.order = dropBoxOrder;
      }
      if (pedal.key === ev.currentTarget.id) {
        pedal.order = dragBoxOrder;
      }
      return pedal;
    });

    setPedalSelectAndOrder(newPedalOrder);
  };

  const {midiConfig} = useContext(MidiConfigContext)
  const midiData = {channel: midiConfig[`${selectedPedal}Channel`], output: midiConfig.output, inputForExpression: midiConfig.inputForExpression}

  useEffect(()=>{
    setExpressionVal(0);
  }, [selectedPedal]);

  return (
    <div className="container">
      <Head>
        <title>macrocosm</title>
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
      </Head>
      <div className="view-port">
        <div className="pedal-selector">
          {/*<Link href="/macros"><a>Macros</a></Link>*/}
          {
            pedalSelectAndOrder
              .sort((a, b) => a.order - b.order)
              .filter((x)=> parseInt(midiConfig[`${x['key']}Channel`]) > 0)
              .map((pedal)=>{
                let className = selectedPedal == pedal['key'] ? 'selected pedal-option' : 'pedal-option';
                let iconSource = selectedPedal == pedal['key'] ? pedal.iconSource.replace('button','button_selected') : pedal.iconSource;
                let changePedal = (e, key)=>{
                  setSelectedPedal(key);
                }
                return <div key={pedal.key} id={pedal.key} onDragOver={(ev) => ev.preventDefault()} draggable="true" onDragStart={handleDrag} onDrop={handleDrop}>
                  <a className={className} onClick={(e)=> changePedal(e, pedal['key'])}>
                    <img src={iconSource}/>
                  </a>
                </div>
            })
          }
        </div>
          {
            selectedPedal == 'enzo' &&
            <MerisEnzoLayout
              expressionVal={expressionVal}
              selectedPedal={selectedPedal}
              midiObject={props.midiObject}
            />
          }
          {
            selectedPedal == 'hedra' &&
            <MerisHedraLayout
              expressionVal={expressionVal}
              selectedPedal={selectedPedal}
              midiObject={props.midiObject}
            />
          }
          {
            selectedPedal == 'polymoon' &&
            <MerisPolymoonLayout
              expressionVal={expressionVal}
              selectedPedal={selectedPedal}
              midiObject={props.midiObject}
            />
          }
          {
            selectedPedal == 'mercury7' &&
            <MerisMercury7Layout
              expressionVal={expressionVal}
              selectedPedal={selectedPedal}
              midiObject={props.midiObject}
            />
          }
          {
            selectedPedal == 'ottobitJr' &&
            <MerisOttobitJrLayout
              expressionVal={expressionVal}
              selectedPedal={selectedPedal}
              midiObject={props.midiObject}
            />
          }
        <Expression
          expressionVal={expressionVal}
          setExpressionVal={setExpressionVal}
          midiData={midiData}
          midiObject={props.midiObject}
          pedalSelectAndOrder={pedalSelectAndOrder}/>
      </div>
    </div>
  )
}