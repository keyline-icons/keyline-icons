import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MousePointer({ size = 24, ...props }: IconProps) {
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
      <path d="M2.0812 4.2173C2.0281 4.0504 2.001 3.8764 2.001 3.7013C2.001 2.7619 2.7626 2.0003 3.702 2.0003C3.8846 2.0003 4.066 2.0297 4.2393 2.0874L20.8356 7.6129C21.5303 7.8442 21.9989 8.4942 21.9989 9.2263C21.9989 9.9137 21.585 10.5336 20.9501 10.797L16.7727 12.5301L21.4142 17.1716C21.7893 17.5467 22 18.0554 22 18.5858C22 19.1162 21.7893 19.6249 21.4142 20L20 21.4142C19.6249 21.7893 19.1162 22 18.5858 22C18.0554 22 17.5467 21.7893 17.1716 21.4142L12.5253 16.7679L10.5308 21.0206C10.2503 21.6187 9.6492 22.0007 8.9886 22.0007C8.2469 22.0007 7.5904 21.5208 7.3654 20.8141L2.0812 4.2173Z" fill="currentColor"/>
    </svg>
  )
}
