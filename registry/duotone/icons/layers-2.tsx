import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Layers2({ size = 24, ...props }: IconProps) {
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
      <path d="M11.1162 1.208C11.6038 0.965 12.165 0.935 12.6709 1.117L12.8838 1.208L21.8838 5.687C23.3718 6.428 23.3718 8.572 21.8838 9.312L12.8838 13.792C12.3266 14.069 11.6733 14.069 11.1162 13.792L2.1162 9.312C0.6281 8.572 0.6281 6.428 2.1162 5.687L11.1162 1.208Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M18.2884 13.334C18.5676 13.198 18.8948 13.2 19.1732 13.338L21.8841 14.688L22.0189 14.761C23.3268 15.535 23.3268 17.465 22.0189 18.24L21.8841 18.313L12.8841 22.792C12.3271 23.069 11.6736 23.069 11.1166 22.792L2.1166 18.313C0.6285 17.572 0.6285 15.429 2.1166 14.688L4.8334 13.334C5.1123 13.198 5.439 13.2 5.7171 13.338L10.225 15.582L10.2259 15.583C11.3439 16.139 12.6569 16.138 13.7748 15.582L18.2884 13.334Z" fill="currentColor"/>
    </svg>
  )
}
