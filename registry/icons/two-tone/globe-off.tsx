import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GlobeOff({ size = 24, ...props }: IconProps) {
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
      <path d="M19.7782 19.7782C17.7876 21.7688 15.0376 23 12 23C5.9249 23 1 18.0751 1 12C1 8.9624 2.2312 6.2124 4.2218 4.2218L19.7782 19.7782Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M19.0711 19.0711C17.2614 20.8807 14.7614 22 12 22M12 22C6.4772 22 2 17.5228 2 12M12 22C13.7626 20.0171 14.9427 17.8157 15.5403 15.5403M12 22C9.3333 19 8 15.5 8 12C8 10.8134 8.1532 9.6268 8.4597 8.4597M2 12C2 9.2386 3.1193 6.7386 4.9289 4.9289M2 12H12M2 2L22 22"/>
      <path d="M8.3456 2.6888C9.4776 2.2442 10.7103 2 12 2C17.5228 2 22 6.4772 22 12C22 13.2897 21.7558 14.5224 21.3112 15.6544M17.6569 12L22 12M10.1522 4.4954C10.6735 3.6344 11.2894 2.7994 12 2C14.2163 4.4933 15.5116 7.332 15.8859 10.2291" strokeOpacity="0.4"/>
    </svg>
  )
}
