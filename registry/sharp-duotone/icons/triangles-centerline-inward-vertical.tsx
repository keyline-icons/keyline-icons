import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function TrianglesCenterlineInwardVertical({ size = 24, ...props }: IconProps) {
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
      <path d="M1.53 6.89C1.857 6.72 2.254 6.74 2.56 6.95L8.816 11.17C9.091 11.36 9.257 11.73 9.257 12.06C9.221 12.35 9.056 12.67 8.816 12.83L2.56 17.05C2.253 17.26 1.857 17.28 1.53 17.11C1.205 16.93 1 16.59 1 16.22V7.78C1 7.41 1.204 7.07 1.53 6.89ZM21.44 6.95C21.746 6.74 22.143 6.72 22.47 6.89C22.796 7.07 23 7.41 23 7.78V16.22C23 16.59 22.795 16.93 22.47 17.11C22.143 17.28 21.747 17.26 21.44 17.05L15.184 12.83C14.944 12.67 14.771 12.28 14.735 12C14.771 11.72 14.943 11.33 15.184 11.17L21.44 6.95Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M13 1V23H11V1H13Z" fill="currentColor"/>
    </svg>
  )
}
