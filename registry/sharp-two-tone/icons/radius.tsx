import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Radius({ size = 24, ...props }: IconProps) {
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
      <path d="M15.68 2.7018C19.4945 4.2114 22 7.8977 22 12C22 17.5228 17.5228 22 12 22C6.4772 22 2 17.5228 2 12C2 7.8977 4.5055 4.2114 8.32 2.7018" fill="none" strokeOpacity="0.4"/>
      <path d="M12 2.5L12 12" fill="none"/>
      <path d="M13.5 2.5C13.5 3.3284 12.8284 4 12 4C11.1716 4 10.5 3.3284 10.5 2.5C10.5 1.6716 11.1716 1 12 1C12.8284 1 13.5 1.6716 13.5 2.5ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
