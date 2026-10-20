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
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.0812 4.2173C2.0281 4.0504 2.001 3.8764 2.001 3.7013C2.001 2.7619 2.7626 2.0003 3.702 2.0003C3.8846 2.0003 4.066 2.0297 4.2393 2.0874L20.8356 7.6129C21.5303 7.8442 21.9989 8.4942 21.9989 9.2263C21.9989 9.9137 21.585 10.5336 20.9501 10.797L16.7727 12.5301L21.4142 17.1716C21.7893 17.5467 22 18.0554 22 18.5858C22 19.1162 21.7893 19.6249 21.4142 20L20 21.4142C19.6249 21.7893 19.1162 22 18.5858 22C18.0554 22 17.5467 21.7893 17.1716 21.4142L12.5253 16.7679L10.5308 21.0206C10.2503 21.6187 9.6492 22.0007 8.9886 22.0007C8.2469 22.0007 7.5904 21.5208 7.3654 20.8141L2.0812 4.2173Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M3.9234 3.0362L20.5197 8.5617C21.1348 8.7665 21.1656 9.6249 20.5669 9.8733L16.3895 11.6064C15.7315 11.8794 15.5619 12.7334 16.0656 13.2372L20.7071 17.8787C21.0976 18.2692 21.0976 18.9024 20.7071 19.2929L19.2929 20.7071C18.9024 21.0976 18.2692 21.0976 17.8787 20.7071L13.2324 16.0608C12.7423 15.5707 11.9142 15.7158 11.6199 16.3433L9.6254 20.596C9.3537 21.1753 8.5124 21.1204 8.3182 20.5107L3.0341 3.9139C2.8602 3.3678 3.3796 2.8551 3.9234 3.0362Z" fill="none"/>
    </svg>
  )
}
