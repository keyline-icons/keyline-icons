import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PlaneOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M18.9653 21.7938L17.8037 22.7652C17.6238 22.9157 17.3967 22.9981 17.1622 22.9981C16.8731 22.9981 16.5982 22.873 16.4083 22.655L11.3425 16.8414L8.9161 18.5746L8.4156 21.4938C8.3335 21.974 7.9173 22.325 7.4301 22.325C7.1711 22.325 6.9223 22.2245 6.7359 22.0447L1.9369 17.418C1.7413 17.2295 1.6308 16.9696 1.6308 16.698C1.6308 16.2239 1.9638 15.8149 2.4281 15.7189L5.4086 15.1013L7.1014 12.6849L1.3673 7.9749C1.136 7.785 1.002 7.5014 1.002 7.2022C1.002 6.9614 1.0888 6.7288 1.2466 6.5469L2.9813 4.5474C3.1712 4.3285 3.4468 4.2027 3.7366 4.2027C3.8012 4.2027 3.8656 4.209 3.929 4.2214L4.2926 4.2926L20.2061 20.2062C20.2082 20.2328 20.2093 20.2595 20.2093 20.2863C20.2093 20.5825 20.078 20.8634 19.8508 21.0534L18.9653 21.7938ZM8.8405 5.1837L12.1425 5.8306L16.1972 2.8852C17.8838 1.6599 19.9151 1 21.9998 1.0001C22.5522 1 23 1.4477 23 2.0001C23 4.045 22.3249 6.0328 21.0796 7.6548L18.052 11.5978L18.9939 15.337L8.8405 5.1837Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
