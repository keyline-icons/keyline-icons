import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Wand({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M19.2929 2.5858L21.4142 4.7071C22.1953 5.4882 22.1953 6.7545 21.4142 7.5355L7.5355 21.4142C6.7545 22.1953 5.4882 22.1953 4.7071 21.4142L2.5858 19.2929C1.8047 18.5118 1.8047 17.2455 2.5858 16.4645L16.4645 2.5858C17.2455 1.8047 18.5118 1.8047 19.2929 2.5858Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M12.5837 6.4665L17.5335 11.4163L7.5355 21.4142C6.7545 22.1953 5.4882 22.1953 4.7071 21.4142L2.5858 19.2929C1.8047 18.5118 1.8047 17.2455 2.5858 16.4645L12.5837 6.4665Z" fill="currentColor"/>
    </svg>
  )
}
